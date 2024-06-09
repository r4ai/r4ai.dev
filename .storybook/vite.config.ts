import path from "node:path"

import { defineConfig } from "vite"
import tsConfigPath from "vite-tsconfig-paths"

import pagefind from "../src/libs/vite-plugins/vite-plugin-pagefind"

export default defineConfig({
  plugins: [
    tsConfigPath({ root: path.dirname(import.meta.dirname) }),
    pagefind(),
  ],
})
