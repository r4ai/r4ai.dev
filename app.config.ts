import { defineConfig } from "@solidjs/start/config"

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
    plugins: [raw()],
    build: {
      rollupOptions: {
        external: ["sharp"],
      },
    },
  },
})
