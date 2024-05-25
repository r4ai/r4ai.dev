import solid from "vite-plugin-solid"
import tsConfigPath from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [solid(), tsConfigPath()],
  resolve: {
    conditions: ["development", "browser"],
  },
})
