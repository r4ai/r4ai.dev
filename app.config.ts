import path from "node:path"

import rehypeSectionize, {
  type RehypeSectionizeOptions,
} from "@hbsnow/rehype-sectionize"
import { nodeTypes } from "@mdx-js/mdx"
import remarkCallout, {
  type Options as RemarkCalloutOptions,
} from "@r4ai/remark-callout"
import rehypeShiki, { type RehypeShikiOptions } from "@shikijs/rehype"
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers"
import { defineConfig } from "@solidjs/start/config"
// @ts-expect-error @vinxi/plugin-mdx is not typed
import pkg from "@vinxi/plugin-mdx"
import rehypeKatex from "rehype-katex"
import rehypeMdxImportMedia, {
  type RehypeMdxImportMediaOptions,
} from "rehype-mdx-import-media"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

import {
  transformerLineNumbers,
  transformerMetaDiff,
  transformerTitle,
} from "./src/libs/rehype-transformers"
import rehypeFootnote from "./src/libs/unified-plugins/rehype-footnote"
import remarkHeader from "./src/libs/unified-plugins/remark-header"
import remarkInlineCode from "./src/libs/unified-plugins/remark-inline-code"
import pagefind from "./src/libs/vite-plugins/vite-plugin-pagefind"
import raw from "./src/libs/vite-plugins/vite-plugin-raw-transform"
import { posts } from "./src/routes/posts/(content)/config"

const { default: mdx } = pkg

const postsDir = path.resolve(
  import.meta.dirname,
  "./src/routes/posts/(content)/",
)

export default defineConfig({
  ssr: true,
  server: {
    preset: "static",
    esbuild: {
      options: {
        target: "es2022",
      },
    },
    prerender: {
      crawlLinks: true,
      routes: [
        "/",
        "/projects",
        "/posts",
        "/contact",
        ...(await posts.getRoutes(postsDir)),
        ...(await posts.getAPIRoutes(["mdx", "png"], postsDir)),
      ],
    },
  },
  extensions: ["ts", "tsx", "mdx"],
  vite: {
    plugins: [
      raw(),
      pagefind(),
      mdx.withImports({})({
        define: {
          "import.meta.env": `'import.meta.env'`,
        },
        jsxImportSource: "solid-jsx",
        providerImportSource: "solid-jsx",
        stylePropertyNameCase: "css",
        remarkRehypeOptions: {
          footnoteLabel: "脚注",
          footnoteLabelProperties: { className: false },
        },
        remarkPlugins: [
          remarkFrontmatter,
          remarkGfm,
          remarkMath,
          remarkInlineCode,
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
              body: (callout) => ({
                tagName: "callout-body",
                properties: {
                  type: callout.type,
                },
              }),
            } satisfies RemarkCalloutOptions,
          ],
          remarkHeader,
        ],
        rehypePlugins: [
          rehypeKatex,
          [
            rehypeShiki,
            {
              themes: {
                light: "one-light",
                dark: "material-theme-darker",
              },
              transformers: [
                transformerMetaDiff(),
                transformerMetaHighlight(),
                transformerMetaWordHighlight(),
                transformerNotationDiff(),
                transformerNotationHighlight(),
                transformerNotationWordHighlight(),
                transformerLineNumbers(),
                transformerTitle(),
              ],
            } satisfies RehypeShikiOptions,
          ],
          [
            rehypeMdxImportMedia,
            {
              attributes: {
                img: ["src", "srcset"],
              },
              elementAttributeNameCase: "html",
            } satisfies RehypeMdxImportMediaOptions,
          ],
          [rehypeRaw, { passThrough: nodeTypes }],
          rehypeSlug,
          rehypeFootnote,
          [
            rehypeSectionize,
            {
              enableRootSection: true,
              properties: { className: false },
              rankPropertyName: "level",
            } satisfies RehypeSectionizeOptions,
          ],
        ],
      }),
    ],
    build: {
      rollupOptions: {
        external: ["sharp"],
      },
    },
  },
})
