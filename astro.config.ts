import * as path from "node:path"
import { fileURLToPath } from "node:url"

import mdx from "@astrojs/mdx"
import tailwind from "@astrojs/tailwind"
import {
  type Options as RemarkCalloutOptions,
  remarkCallout,
} from "@r4ai/remark-callout"
import type { AstroIntegration, RemarkPlugins } from "astro"
import { defineConfig } from "astro/config"
import * as pagefind from "pagefind"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
import sirv from "sirv"

const pageFind = (): AstroIntegration => {
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
        const { index } = await pagefind.createIndex({})
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

// https://astro.build/config
export default defineConfig({
  site: "https://r4ai.dev",
  prefetch: true,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    pageFind(),
  ],
  redirects: {
    "/posts/raw/[...slug]": "/posts/[...slug]/raw",
  },
  markdown: {
    remarkPlugins: [
      remarkMath as unknown as RemarkPlugins[number],
      // remarkEmbed,
      [
        remarkCallout,
        {
          root: (callout) => {
            return {
              tagName: "callout-root",
              properties: {
                type: callout.type,
                isFoldable: callout.isFoldable.toString(),
                defaultFolded: callout.defaultFolded?.toString(),
              },
            }
          },
          title: (callout) => ({
            tagName: "callout-title",
            properties: {
              type: callout.type,
              isFoldable: callout.isFoldable.toString(),
            },
          }),
          body: () => ({
            tagName: "callout-body",
            properties: {},
          }),
        } satisfies RemarkCalloutOptions,
      ],
    ],
    rehypePlugins: [rehypeKatex],
    remarkRehype: {
      footnoteLabel: "脚注",
      footnoteLabelTagName: "h2",
      footnoteLabelProperties: {},
    },
    syntaxHighlight: false,
  },
})
