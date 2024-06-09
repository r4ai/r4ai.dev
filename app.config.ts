import { defineConfig } from "@solidjs/start/config"

import pagefind from "./src/libs/vite-plugins/vite-plugin-pagefind"
import raw from "./src/libs/vite-plugins/vite-plugin-raw-transform"

export default defineConfig({
  ssr: true,
  server: {
    preset: "static",
    prerender: {
      crawlLinks: true,
    },
  },
  vite: {
    plugins: [raw(), pagefind()],
    build: {
      rollupOptions: {
        external: ["sharp"],
      },
    },
  },
})
