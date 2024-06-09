import { existsSync } from "node:fs"
import path from "node:path"

import type { Plugin, ResolvedConfig } from "vite"

export type PagefindPluginOptions = {
  /**
   * Path to a directory of static HTML files.
   * For example, `solid-start` with static server preset generates static HTML files in `.output/public`.
   * @default ".output/public"
   */
  site: string
}

export const defaultPagefindPluginOptions = {
  site: ".output/public",
} as const satisfies PagefindPluginOptions

export const pagefindPlugin = (
  options: PagefindPluginOptions = defaultPagefindPluginOptions,
): Plugin => {
  let config: ResolvedConfig
  return {
    name: "pagefind-js",
    configResolved(resolvedConfig) {
      config = resolvedConfig
    },
    resolveId(id) {
      if (id === "pagefind-js") {
        if (config?.server) {
          return path.resolve(config.root, options.site, "pagefind/pagefind.js")
        } else {
          return "/pagefind/pagefind.js"
        }
      }
    },
    configureServer() {
      if (!existsSync(path.resolve(config.root, options.site, "pagefind"))) {
        console.warn(
          `pagefind output directory "${path.join(options.site, "pagefind")}" does not exist. Please run \`bun run build\` before running \`bun run dev\`. Otherwise, Pagefind will not work.`,
        )
      }
    },
  }
}
