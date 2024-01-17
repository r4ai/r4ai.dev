import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import react from "@astrojs/react"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import svelte from "@astrojs/svelte"

import mdx from "@astrojs/mdx"
import type { RemarkPlugins } from "astro"
import {
  rehypeCustomCode,
  type RehypeCustomCodeOptions,
} from "rehype-custom-code"
import remarkMetaString from "remark-meta-string"
import { remarkEmbed } from "./src/lib/remarkPlugins/remarkEmbed"

// https://astro.build/config
export default defineConfig({
  site: "https://r4ai.dev",
  vite: {
    ssr: {
      noExternal: ["rehype-custom-code", "remark-meta-string", "react-tweet"],
    },
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    svelte(),
    mdx(),
  ],
  redirects: {
    "/posts/raw/[...slug]": "/posts/[...slug]/raw",
  },
  markdown: {
    remarkPlugins: [
      remarkMath as unknown as RemarkPlugins[number],
      remarkMetaString as unknown as RemarkPlugins[number],
      remarkEmbed,
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
    syntaxHighlight: false,
  },
})
