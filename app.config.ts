import { defineConfig } from "@solidjs/start/config"
import pkg from "@vinxi/plugin-mdx"
import rehypeKatex from "rehype-katex"
import rehypeMdxImportMedia from "rehype-mdx-import-media"
import rehypeSlug from "rehype-slug"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

import pagefind from "./src/libs/vite-plugins/vite-plugin-pagefind"
import raw from "./src/libs/vite-plugins/vite-plugin-raw-transform"

const { default: mdx } = pkg

export default defineConfig({
  ssr: true,
  server: {
    preset: "static",
    prerender: {
      crawlLinks: true,
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
        remarkPlugins: [remarkFrontmatter, remarkGfm, remarkMath],
        rehypePlugins: [rehypeKatex, rehypeSlug, rehypeMdxImportMedia],
      }),
    ],
    build: {
      rollupOptions: {
        external: ["sharp"],
      },
    },
  },
})
