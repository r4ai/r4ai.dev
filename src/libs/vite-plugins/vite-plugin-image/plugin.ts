import { createHash } from "node:crypto"
import { writeFileSync } from "node:fs"
import path from "node:path"

import { genObjectFromRaw } from "knitwork"
import { generateCode, parseModule } from "magicast"
import pLimit from "p-limit"
import type { PluginContext } from "rollup"
import sharp, { type Metadata } from "sharp"
import type { Plugin, ResolvedConfig } from "vite"

import { joinUrlSegments, removeLeadingSlash } from "./utils"

export type Image = {
  url: {
    [key: string]: string
    avif: string
    webp: string
  }
  metadata: Metadata
}

const SUPPORTED_IMAGE_TYPES = ["png", "jpg", "jpeg", "gif"] as const

const getFileType = (filePath: string) => {
  const ext = filePath.split(".").pop()?.split("?")[0]
  if (!ext) return undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (SUPPORTED_IMAGE_TYPES.includes(ext as any))
    return ext as (typeof SUPPORTED_IMAGE_TYPES)[number]
  return undefined
}

const genModule = (image: Image) => {
  const mod = parseModule("export default {}")
  mod.exports.default = image
  return generateCode(mod)
}

const fileToUrl = (
  id: string,
  config: ResolvedConfig,
  ctx: PluginContext,
): Promise<Image["url"] | undefined> => {
  const relativeId = path.relative(config.root, id)
  if (config.command === "serve") {
    return fileToDevUrl(relativeId, config)
  } else {
    return fileToBuiltUrl(relativeId, config, ctx)
  }
}

const fileToDevUrl = async (
  id: string,
  config: ResolvedConfig,
): Promise<Image["url"] | undefined> => {
  const fileType = getFileType(id)
  if (!fileType) return undefined
  const base = joinUrlSegments(config.server?.origin ?? "", config.base)
  const url = joinUrlSegments(base, removeLeadingSlash(id))
  return {
    [fileType]: url,
    avif: url.replace(/\.\w+$/, ".avif"),
    webp: url.replace(/\.\w+$/, ".webp"),
  }
}

const fileToBuiltUrl = async (
  id: string,
  config: ResolvedConfig,
  ctx: PluginContext,
): Promise<Image["url"] | undefined> => {
  const fileType = getFileType(id)
  if (!fileType) return undefined
  const image = sharp(id)
  const urls: Image["url"] = {
    [fileType]: ctx.emitFile({
      name: path.basename(id),
      type: "asset",
      source: await image
        .toFormat(fileType, {
          compressionLevel: 6,
          adaptiveFiltering: true,
          quality: 80,
          palette: true,
        })
        .toBuffer(),
    }),
    avif: ctx.emitFile({
      name: path.basename(id).replace(/\.\w+$/, ".avif"),
      type: "asset",
      source: await image.toFormat("avif", { quality: 60 }).toBuffer(),
    }),
    webp: ctx.emitFile({
      name: path.basename(id).replace(/\.\w+$/, ".webp"),
      type: "asset",
      source: await image.toFormat("webp", { quality: 80 }).toBuffer(),
    }),
  }
  return urls
}

export type ImagePluginOptions = {
  assetsOutputDir?: string
}

export const defaultImagePluginOptions = {
  assetsOutputDir: ".output/public/assets",
} as const satisfies Required<ImagePluginOptions>

export const imagePlugin = (options = defaultImagePluginOptions): Plugin => {
  let config: ResolvedConfig
  const imagesCache = new Map<
    string,
    {
      id: string
      url: Image["url"]
      metadata: Image["metadata"]
    }
  >()

  return {
    name: "image",
    enforce: "pre",
    configResolved(resolvedConfig) {
      config = resolvedConfig
    },
    async transform(code, id) {
      if (!id.endsWith("?image")) return
      const fileType = getFileType(id)
      switch (fileType) {
        case "png":
        case "jpg":
        case "jpeg":
        case "gif": {
          const hash = createHash("sha1").update(id).digest("hex")
          if (imagesCache.has(hash)) {
            const image = imagesCache.get(hash)!
            return genModule(image)
          }

          const filePath = id.replace(/\?image$/, "")
          const image = sharp(filePath)
          const metadata = await image.metadata()

          const url = await fileToUrl(filePath, config, this)
          if (!url) return

          imagesCache.set(hash, { id: filePath, url, metadata })

          const mod = genModule({ url, metadata })
          console.log(mod.code)
          return mod
        }
      }
    },
    generateBundle(options, bundle) {
      // writeFileSync(crypto.randomUUID() + ".json", JSON.stringify(bundle, null, 2))
    },
    // buildStart: async () => {
    //   const building = []
    //   usedImages.forEach(({ id, url }, hash) => {
    //     config.logger.info(`[image] processing ${id} -> ${url}`)
    //     const resolve = (filename: string) => {
    //       const parts = filename.split(".")
    //       const ext = parts.pop()
    //       const names = parts
    //       return path.resolve(config.root, options.assetsOutputDir, `${[...names, hash, ext].join(".")}`)
    //     }
    //     const genAvif = limit(() =>
    //       sharp(id)
    //         .toFormat("avif", { quality: 60 })
    //         .toFile(resolve(path.basename(url.avif))),
    //     )
    //     const genWebp = limit(() =>
    //       sharp(id).toFormat("webp", { quality: 80 }).toFile(resolve(path.basename(url.webp))),
    //     )
    //     building.push(genAvif, genWebp)
    //   })
    //   await Promise.all(building)
    // },
  }
}
