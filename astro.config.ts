import mdx from "@astrojs/mdx"
import solid from "@astrojs/solid-js"
import tailwind from "@astrojs/tailwind"
import {
  type Options as RemarkCalloutOptions,
  remarkCallout,
} from "@r4ai/remark-callout"
import remarkEmbed, { type RemarkEmbedOptions } from "@r4ai/remark-embed"
import {
  transformerLinkCard,
  type TransformerLinkCardOptions,
  transformerOEmbed,
  type TransformerOEmbedOptions,
} from "@r4ai/remark-embed/transformers"
import type { RemarkPlugins } from "astro"
import { defineConfig } from "astro/config"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
import icons from "unplugin-icons/vite"

import pagefind from "./src/lib/vite-plugins/vite-plugin-pagefind"
import rawTransform from "./src/lib/vite-plugins/vite-plugin-raw-transform"

// https://astro.build/config
export default defineConfig({
  site: "https://r4ai.dev",
  prefetch: true,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    solid(),
  ],
  redirects: {
    // "/posts/raw/[...slug]": "/posts/[...slug]/raw",
  },
  vite: {
    plugins: [pagefind(), rawTransform(), icons({ compiler: "solid" })],
  },
  markdown: {
    remarkPlugins: [
      remarkMath as unknown as RemarkPlugins[number],
      [
        remarkEmbed,
        {
          transformers: [
            transformerOEmbed({
              video: (url, oEmbed) => ({
                tagName: "oembed-video",
                properties: {
                  url: url.href,
                  oEmbed: JSON.stringify(oEmbed),
                },
                children: [],
              }),
              rich: (url, oEmbed) => ({
                tagName: "oembed-rich",
                properties: {
                  url: url.href,
                  oEmbed: JSON.stringify(oEmbed),
                },
                children: [],
              }),
            } satisfies TransformerOEmbedOptions),
            transformerLinkCard({
              tagName: () => "link-card",
              properties: (og) => ({ og: JSON.stringify(og) }),
              children: () => [],
            } satisfies TransformerLinkCardOptions),
          ],
        } satisfies RemarkEmbedOptions,
      ],
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
