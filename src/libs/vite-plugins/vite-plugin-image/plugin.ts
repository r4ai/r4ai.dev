import { createHash } from "node:crypto"
import path from "node:path"

import { genObjectFromRaw } from "knitwork"
import { generateCode, parseModule } from "magicast"
import pLimit from "p-limit"
import sharp, { type Metadata } from "sharp"
import type { Plugin, ResolvedConfig } from "vite"

export type Image = {
  url: {
    [key: string]: string
    avif: string
    webp: string
  }
  metadata: Metadata
}

const getFileType = (filePath: string) => {
  const ext = filePath.split(".").pop()?.split("?")[0]
  if (!ext) return ""
  return ext.toLowerCase()
}

const genModule = (image: Image) => {
  const mod = parseModule("export default {}")
  mod.exports.default = image
  return generateCode(mod)
}

export type ImagePluginOptions = {
  assetsOutputDir?: string
}

export const defaultImagePluginOptions = {
  assetsOutputDir: ".output/public/assets",
} as const satisfies Required<ImagePluginOptions>

export const imagePlugin = (options = defaultImagePluginOptions): Plugin => {
  let config: ResolvedConfig
  const usedImages = new Map<
    string,
    {
      id: string
      url: Image["url"]
      metadata: Image["metadata"]
    }
  >()
  const limit = pLimit(5)

  return {
    name: "image",
    enforce: "pre",
    configResolved: (resolvedConfig) => {
      config = resolvedConfig
    },
    transform: async (code, id) => {
      if (!id.endsWith("?image")) return
      const fileType = getFileType(id)
      switch (fileType) {
        case "png":
        case "jpg":
        case "jpeg":
        case "gif": {
          const hash = createHash("sha1").update(id).digest("hex")
          if (usedImages.has(hash)) {
            const image = usedImages.get(hash)!
            return genModule(image)
          }

          const filePath = id.replace(/\?image$/, "")
          const image = sharp(filePath)
          const metadata = await image.metadata()
          const relativePath = path.relative(config.root, filePath)
          const url: Image["url"] = {
            [fileType]: path.join("/_build", relativePath),
            avif: path.join("/_build", relativePath.replace(/\.\w+$/, ".avif")),
            webp: path.join("/_build", relativePath.replace(/\.\w+$/, ".webp")),
          }
          usedImages.set(hash, { id: filePath, url, metadata })
          const mod = genModule({ url, metadata })
          console.log(mod.code)
          return mod
        }
      }
    },
    buildStart: async () => {
      const building = []
      usedImages.forEach(({ id, url }, hash) => {
        config.logger.info(`[image] processing ${id} -> ${url}`)
        const resolve = (filename: string) => {
          const parts = filename.split(".")
          const ext = parts.pop()
          const names = parts
          return path.resolve(config.root, options.assetsOutputDir, `${[...names, hash, ext].join(".")}`)
        }
        const genAvif = limit(() =>
          sharp(id)
            .toFormat("avif", { quality: 60 })
            .toFile(resolve(path.basename(url.avif))),
        )
        const genWebp = limit(() =>
          sharp(id).toFormat("webp", { quality: 80 }).toFile(resolve(path.basename(url.webp))),
        )
        building.push(genAvif, genWebp)
      })
      await Promise.all(building)
    },
  }
}
