import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  experimental: {
    viewTransitions: true,
    assets: true
  },
  integrations: [tailwind({
    applyBaseStyles: false
  }), react(), svelte()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: "material-theme-darker"
    }
  }
});