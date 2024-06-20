import path from "node:path"

import unocss from "unocss/vite"
import { defineConfig } from "vite"
import tsConfigPath from "vite-tsconfig-paths"

import pagefind from "../src/libs/vite-plugins/vite-plugin-pagefind"

export default defineConfig({
  plugins: [
    unocss({
      configFile: path.resolve(import.meta.dirname, "../unocss.config.ts"),
    }),
    tsConfigPath({ root: path.dirname(import.meta.dirname) }),
    pagefind(),
  ],
})
