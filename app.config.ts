import { defineConfig } from "@solidjs/start/config"

import image from "./src/libs/vite-plugins/vite-plugin-image"
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
    plugins: [raw(), image()],
    build: {
      rollupOptions: {
        external: ["sharp"],
      },
    },
  },
})
