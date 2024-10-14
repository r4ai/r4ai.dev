import { existsSync } from "node:fs"
import * as path from "node:path"

import type { Plugin, ResolvedConfig } from "vite"

export type PagefindPluginOptions = {
  /**
   * Path to a directory of static HTML files.
   * For example, `solid-start` with static server preset generates static HTML files in `.output/public`.
   * @default "dist"
   */
  site: string
}

export const defaultPagefindPluginOptions = {
  site: "dist",
} as const satisfies PagefindPluginOptions

export const pagefindPlugin = (
  options: PagefindPluginOptions = defaultPagefindPluginOptions
): Plugin => {
  let config: ResolvedConfig
  let isBuild: boolean
  const pagefindJsPath = () =>
    path.resolve(config.root, options.site, "pagefind/pagefind.js")
  return {
    name: "pagefind-js",
    config(_, { command }) {
      isBuild = command === "build"
      return {
        build: {
          rollupOptions: {
            external: "/pagefind/pagefind.js",
          },
        },
      }
    },
    configResolved(resolvedConfig) {
      config = resolvedConfig
    },
    resolveId(id) {
      if (id === "pagefind-js") {
        if (isBuild) {
          return "/pagefind/pagefind.js"
        }
        return pagefindJsPath()
      }
      return undefined
    },
    configureServer() {
      if (!existsSync(pagefindJsPath())) {
        console.warn(
          `pagefind output directory "${path.join(options.site, "pagefind")}" does not exist. Please run \`bun run build\` before running \`bun run dev\`. Otherwise, Pagefind will not work.`
        )
      }
    },
  }
}
