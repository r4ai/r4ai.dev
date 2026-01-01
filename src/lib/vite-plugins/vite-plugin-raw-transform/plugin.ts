import { readFile } from "node:fs/promises"
import path from "node:path"

import { build, type Plugin as ESBuildPlugin } from "esbuild"
import { genString } from "knitwork"
import { type Plugin } from "vite"

const constantFoldingPlugin = ({
  platform,
}: {
  platform: "node" | "browser"
}): ESBuildPlugin => {
  return {
    name: "constant-folding",
    setup(build) {
      build.onLoad({ filter: /\.(js|ts|jsx|tsx)$/ }, async (args) => {
        const ext = path.extname(args.path).slice(1) as
          | "js"
          | "ts"
          | "jsx"
          | "tsx"
        let source = await readFile(args.path, "utf-8")

        // Replace `typeof window === "undefined"` with `true` or `false` depending on the platform
        source =
          platform === "node"
            ? source.replaceAll('typeof window === "undefined"', "true")
            : source.replaceAll('typeof window === "undefined"', "false")

        return {
          contents: source,
          loader: ext,
        }
      })
    },
  }
}

/**
 * A Vite plugin that makes it possible to import transformed raw code from files.
 *
 * Transformations are done using esbuild, and the files are minified and tree-shaken.
 * @returns The Vite plugin.
 * @example
 * 1. Configure the plugin in the Vite config file:
 *
 *    ```ts
 *    // vite.config.ts
 *    import rawTransform from "./libs/vite-plugins/vite-plugin-raw-transform"
 *
 *    export default defineConfig({
 *      plugins: [rawTransform()],
 *    })
 *    ```
 *
 * 2. Import files with the `?transform` suffix:
 *
 *    ```ts
 *    import transformedCode from "./path/to/typescript-file?transform"
 *
 *    console.log(transformedCode)  // var a=1;console.log(a);...
 *    ```
 */
export const rawTransformPlugin = (): Plugin => {
  return {
    name: "raw-transformed",
    transform: async function (code, id) {
      if (!id.endsWith("?transform")) return
      const buildResult = await build({
        stdin: {
          contents: code,
          resolveDir: path.dirname(id),
          loader: "ts",
        },
        platform: "browser",
        bundle: true,
        write: false,
        minify: true,
        treeShaking: true,
        metafile: true,
        plugins: [constantFoldingPlugin({ platform: "browser" })],
      })
      for (const input of Object.keys(buildResult.metafile?.inputs ?? {})) {
        // esbuild uses "<stdin>" for the virtual entry, skip it.
        if (input === "<stdin>") continue
        const resolvedInput = path.resolve(input)
        if (resolvedInput.includes(`${path.sep}node_modules${path.sep}`))
          continue
        // Watch actual source deps so ?transform updates when they change.
        this.addWatchFile(resolvedInput)
      }
      const transformed = buildResult.outputFiles[0]?.text ?? ""
      return {
        code: `export default ${genString(transformed, { singleQuotes: false })}`,
      }
    },
  }
}
