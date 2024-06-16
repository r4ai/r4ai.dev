import rehypeSectionize, {
  type RehypeSectionizeOptions,
} from "@hbsnow/rehype-sectionize"
import { nodeTypes } from "@mdx-js/mdx"
import rehypeShiki, { RehypeShikiOptions } from "@shikijs/rehype"
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers"
import { defineConfig } from "@solidjs/start/config"
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
import remarkInlineCode from "./src/libs/unified-plugins/remark-inline-code"
import pagefind from "./src/libs/vite-plugins/vite-plugin-pagefind"
import raw from "./src/libs/vite-plugins/vite-plugin-raw-transform"

const { default: mdx } = pkg

export default defineConfig({
  ssr: true,
  server: {
    preset: "static",
    prerender: {
      crawlLinks: true,
      routes: ["/", "/projects", "/posts", "/contact", "/posts/hello-world"],
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
