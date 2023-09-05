import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
  experimental: {
    viewTransitions: true,
    assets: true,
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeKatex,
    ],
    shikiConfig: {
      theme: "material-theme-darker",
    },
  },
});
