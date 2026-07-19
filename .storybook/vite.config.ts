import path from "node:path"

import tailwindcss from "@tailwindcss/vite"
import icons from "unplugin-icons/vite"
import { defineConfig } from "vite"
import tsConfigPath from "vite-tsconfig-paths"

import pagefind from "../src/lib/vite-plugins/vite-plugin-pagefind"
import rawTransform from "../src/lib/vite-plugins/vite-plugin-raw-transform"

export default defineConfig({
  resolve: {
    alias: {
      "@storybook/test": "storybook/test",
    },
  },
  plugins: [
    tailwindcss(),
    tsConfigPath({ root: path.dirname(import.meta.dirname) }),
    pagefind(),
    rawTransform(),
    icons({ compiler: "solid" }),
  ],
})
