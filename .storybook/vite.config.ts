import path from "node:path"

import icons from "unplugin-icons/vite"
import { defineConfig } from "vite"
import tsConfigPath from "vite-tsconfig-paths"

import pagefind from "@/lib/vite-plugins/vite-plugin-pagefind"
import rawTransform from "@/lib/vite-plugins/vite-plugin-raw-transform"

export default defineConfig({
  plugins: [
    tsConfigPath({ root: path.dirname(import.meta.dirname) }),
    pagefind(),
    rawTransform(),
    icons({ compiler: "solid" }),
  ],
})
