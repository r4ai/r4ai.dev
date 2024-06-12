import { defineConfig } from "@solidjs/start/config"
import pkg from "@vinxi/plugin-mdx"

import pagefind from "./src/libs/vite-plugins/vite-plugin-pagefind"
import raw from "./src/libs/vite-plugins/vite-plugin-raw-transform"

const { default: mdx } = pkg

export default defineConfig({
  ssr: true,
  server: {
    preset: "static",
    prerender: {
      crawlLinks: true,
    },
  },
  extensions: ["ts", "tsx", "mdx"],
  vite: {
    plugins: [
      raw(),
      pagefind(),
      mdx.withImports({})({
        define: {
          "import.meta.env": `'import.meta.env'`,
        },
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "solid-mdx",
        rehypePlugins: [],
        remarkPlugins: [],
      }),
    ],
    build: {
      rollupOptions: {
        external: ["sharp"],
      },
    },
  },
})
