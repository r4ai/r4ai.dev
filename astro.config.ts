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
                  code(hast) {
                    if (meta.diff) {
                      hast.properties["data-diff"] = true

                      let diffIndetSize = 0
                      for (const child of hast.children) {
                        if (
                          child.type !== "element" ||
                          child.children[0].type !== "element" ||
                          child.children[0].children[0].type !== "text"
                        )
                          continue

                        const value = child.children[0].children[0].value
                        if (value.startsWith("+") || value.startsWith("-")) {
                          const valueWithoutPrefix = value.slice(1)
                          diffIndetSize =
                            valueWithoutPrefix.length -
                            valueWithoutPrefix.trimStart().length +
                            1
                        } else {
                          diffIndetSize =
                            value.length - value.trimStart().length
                        }
                        break
                      }

                      hast.children.forEach((line) => {
                        if (
                          line.type !== "element" ||
                          line.children.length <= 0 ||
                          !("children" in line.children[0]) ||
                          line.children[0].children.length <= 0 ||
                          line.children[0].children[0].type !== "text"
                        )
                          return

                        const value = line.children[0].children[0].value

                        // 余分なスペースを削除
                        const toRemoveChars = value.slice(0, diffIndetSize)
                        for (let i = 0; i < toRemoveChars.length; i++) {
                          if (toRemoveChars[i] !== " ") {
                            break
                          }
                          line.children[0].children[0].value =
                            line.children[0].children[0].value.slice(1)
                        }

                        switch (value.trim()[0]) {
                          case "+": {
                            line.properties["data-diff-added"] = true

                            // +を削除
                            line.children[0].children[0].value = value
                              .trimStart()
                              .slice(1)

                            // 余分なスペースを削除
                            {
                              const secondChild =
                                value.trim().length > 1
                                  ? line.children[0]
                                  : line.children[1]
                              if (
                                secondChild.type !== "element" ||
                                secondChild.children[0].type !== "text"
                              )
                                break

                              const secondValue = secondChild.children[0].value
                              const toRemoveChars = secondValue.slice(
                                0,
                                Math.max(0, diffIndetSize - 1)
                              )

                              for (let i = 0; i < toRemoveChars.length; i++) {
                                if (toRemoveChars[i] !== " ") {
                                  break
                                }
                                secondChild.children[0].value =
                                  secondChild.children[0].value.slice(1)
                              }
                            }

                            break
                          }
                          case "-":
                            line.properties["data-diff-removed"] = true

                            // -を削除
                            line.children[0].children[0].value = value
                              .trimStart()
                              .slice(1)

                            // 余分なスペースを削除
                            {
                              const secondChild =
                                value.trim().length > 1
                                  ? line.children[0]
                                  : line.children[1]
                              if (
                                secondChild.type !== "element" ||
                                secondChild.children[0].type !== "text"
                              )
                                break

                              const secondValue = secondChild.children[0].value
                              const toRemoveChars = secondValue.slice(
                                0,
                                Math.max(0, diffIndetSize - 1)
                              )

                              for (let i = 0; i < toRemoveChars.length; i++) {
                                if (toRemoveChars[i] !== " ") {
                                  break
                                }
                                secondChild.children[0].value =
                                  secondChild.children[0].value.slice(1)
                              }
                            }

                            break
                        }
                      })
                    }
                  },
                },
                {
                  code(hast) {
                    if (meta.showLineNumbers) {
                      hast.properties["data-line-numbers"] = true
                    }
                  },
                  line(hast, line) {
                    if (hast.children.length > 0) {
                      hast.properties["data-line"] = line
                    }
                    if (meta.range?.includes(line)) {
                      hast.properties["data-highlighted-line"] = true
                    }
                  },
                },
              ]
            },
          },
        } satisfies RehypeCustomCodeOptions,
      ],
    ],
    syntaxHighlight: false,
  },
})
