import path from "node:path"
import { fileURLToPath } from "node:url"

import type { AstroIntegration } from "astro"
import * as pf from "pagefind"
import sirv from "sirv"

export const pagefind = (): AstroIntegration => {
  let outDir: string | undefined = undefined

  return {
    name: "pagefind",
    hooks: {
      "astro:config:setup": ({ config }) => {
        outDir = fileURLToPath(config.outDir)
      },
      "astro:server:setup": ({ server }) => {
        if (!outDir) {
          throw new Error("outDir is undefined")
        }

        const pagefindMiddleware = sirv(outDir, {
          dev: true,
          etag: true,
          maxAge: 0,
        })

        server.middlewares.use((req, res, next) => {
          if (req.url?.startsWith("/pagefind")) {
            return pagefindMiddleware(req, res, next)
          }
          next()
        })
      },
      "astro:build:done": async () => {
        if (!outDir) {
          throw new Error("outDir is undefined")
        }

        // Create a Pagefind search index to work with
        const { index } = await pf.createIndex({})
        if (!index) {
          throw new Error("index is undefined")
        }

        // Index all HTML files in a directory
        await index.addDirectory({
          path: outDir,
        })

        // Write the index to disk
        await index.writeFiles({
          outputPath: path.join(outDir, "pagefind"),
        })
      },
    },
  }
}
