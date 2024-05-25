import { defineConfig } from "@solidjs/start/config"

export default defineConfig({
  ssr: true,
  server: {
    prerender: {
      routes: ["/", "/about"],
    },
  },
})
