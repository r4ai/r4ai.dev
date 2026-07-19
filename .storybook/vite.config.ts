import tailwindcss from "@tailwindcss/vite"
import icons from "unplugin-icons/vite"
import { defineConfig } from "vite"

import pagefind from "../src/lib/vite-plugins/vite-plugin-pagefind"
import rawTransform from "../src/lib/vite-plugins/vite-plugin-raw-transform"

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@storybook/test": "storybook/test",
    },
  },
  plugins: [
    tailwindcss(),
    pagefind(),
    rawTransform(),
    icons({ compiler: "solid" }),
  ],
})
