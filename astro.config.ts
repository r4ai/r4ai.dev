import mdx from "@astrojs/mdx"
import solid from "@astrojs/solid-js"
import tailwind from "@astrojs/tailwind"
import {
  type Options as RemarkCalloutOptions,
  remarkCallout,
} from "@r4ai/remark-callout"
import type { RemarkPlugins } from "astro"
import { defineConfig } from "astro/config"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"

import { pagefind } from "./src/lib/astro-integrations/pagefind"

// https://astro.build/config
export default defineConfig({
  site: "https://r4ai.dev",
  prefetch: true,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    pagefind(),
    solid(),
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
