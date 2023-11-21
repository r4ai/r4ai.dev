import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import svelte from "@astrojs/svelte";

import mdx from "@astrojs/mdx";
import type { AstroIntegration } from "astro";

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
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      experimentalThemes: {
        light: "github-light",
        dark: "one-dark-pro",
      },
    },
  },
});
