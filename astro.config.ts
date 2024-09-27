import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import react from "@astrojs/react"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import { fileURLToPath } from "node:url"
import * as path from "node:path"
import sirv from "sirv"

import mdx from "@astrojs/mdx"
import type { AstroIntegration, RemarkPlugins } from "astro"
import {
  rehypeCustomCode,
  type RehypeCustomCodeOptions,
} from "rehype-custom-code"
import remarkMetaString from "remark-meta-string"
import {
  remarkCallout,
  type Options as RemarkCalloutOptions,
} from "@r4ai/remark-callout"

import * as pagefind from "pagefind"

const pageFind = (): AstroIntegration => {
  let outDir: string | undefined = undefined

  return {
    name: "pagefind",
    hooks: {
      "astro:config:setup": ({ config }) => {
        outDir = fileURLToPath(config.outDir)
      },
      "astro:server:setup": async ({ server }) => {
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
  vite: {
    ssr: {
      noExternal: ["react-tweet"],
    },
  },
  prefetch: true,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    mdx(),
    pageFind(),
  ],
  redirects: {
    "/posts/raw/[...slug]": "/posts/[...slug]/raw",
  },
  markdown: {
    remarkPlugins: [
      remarkMath as unknown as RemarkPlugins[number],
      remarkMetaString as unknown as RemarkPlugins[number],
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
    rehypePlugins: [
      rehypeKatex,
      [
        rehypeCustomCode,
        {
          shouldExportCodeAsProps: true,
          shiki: {
            themes: {
              light: "github-light",
              dark: "one-dark-pro",
            },
          },
        } satisfies RehypeCustomCodeOptions,
      ],
    ],
    remarkRehype: {
      footnoteLabel: "脚注",
      footnoteLabelTagName: "h2",
      footnoteLabelProperties: {},
    },
    syntaxHighlight: false,
  },
})
