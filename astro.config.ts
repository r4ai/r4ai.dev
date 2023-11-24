import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import react from "@astrojs/react"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import svelte from "@astrojs/svelte"

import mdx from "@astrojs/mdx"
import type { AstroIntegration, RemarkPlugins } from "astro"
import {
  rehypeCustomCode,
  type RehypeCustomCodeOptions,
} from "rehype-custom-code"
import remarkMetaString from "remark-meta-string"

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }) as AstroIntegration,
    react(),
    svelte() as AstroIntegration,
    mdx() as AstroIntegration,
  ],
  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkMetaString as unknown as RemarkPlugins[number],
    ],
    rehypePlugins: [
      rehypeKatex,
      [
        rehypeCustomCode,
        {
          propsPrefix: "",
          shouldExportCodeAsProps: true,
          shiki: {
            themes: {
              light: "github-light",
              dark: "one-dark-pro",
            },
            transformers(meta) {
              return [
                {
                  line(hast, line) {
                    if (hast.children.length > 0) {
                      hast.properties["data-line"] = line
                    }
                    if (meta.range?.includes(line)) {
                      hast.properties["data-highlighted-line"] = true
                    }
                  },
                  code(hast) {
                    if (meta.showLineNumbers) {
                      hast.properties["data-line-numbers"] = true
                    }
                  },
                },
              ]
            },
          },
        } satisfies RehypeCustomCodeOptions,
      ] as unknown as RemarkPlugins[number],
    ],
    syntaxHighlight: false,
  },
})
