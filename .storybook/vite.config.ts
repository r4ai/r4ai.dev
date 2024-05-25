import path from "node:path"

import { defineConfig } from "vite"
import tsConfigPath from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [tsConfigPath({ root: path.dirname(import.meta.dirname) })],
})
