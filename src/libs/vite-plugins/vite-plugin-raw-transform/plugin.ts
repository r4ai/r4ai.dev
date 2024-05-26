import path from "node:path"

import { build } from "esbuild"
import { genString } from "knitwork"
import { type Plugin } from "vite"

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
    transform: async (code, id) => {
      if (!id.endsWith("?transform")) return
      const buildResult = await build({
        stdin: {
          contents: code,
          resolveDir: path.dirname(id),
          loader: "ts",
        },
        bundle: true,
        write: false,
        minify: true,
        treeShaking: true,
      })
      const transformed = buildResult.outputFiles[0].text
      return {
        code: `export default ${genString(transformed, { singleQuotes: false })}`,
      }
    },
  }
}
