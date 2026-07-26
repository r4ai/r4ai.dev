import { readFile } from "node:fs/promises"
import path from "node:path"

import {
  build,
  type Loader,
  type Metafile,
  type Plugin as ESBuildPlugin,
} from "esbuild"
import { genString } from "knitwork"
import { type Plugin } from "vite"

const loadersByExtension: Readonly<Record<string, Loader>> = {
  ".js": "js",
  ".ts": "ts",
  ".jsx": "jsx",
  ".tsx": "tsx",
}

const getLoader = (filePath: string): Loader => {
  const extension = path.extname(filePath)
  const loader = loadersByExtension[extension]
  if (!loader) {
    throw new Error(`Unsupported source extension: ${extension}`)
  }
  return loader
}

const constantFoldingPlugin = ({
  platform,
}: {
  platform: "node" | "browser"
}): ESBuildPlugin => {
  return {
    name: "constant-folding",
    setup(build) {
      build.onLoad({ filter: /\.(js|ts|jsx|tsx)$/ }, async (args) => {
        let source = await readFile(args.path, "utf-8")

        // Replace `typeof window === "undefined"` with `true` or `false` depending on the platform
        source =
          platform === "node"
            ? source.replaceAll('typeof window === "undefined"', "true")
            : source.replaceAll('typeof window === "undefined"', "false")

        return {
          contents: source,
          loader: getLoader(args.path),
        }
      })
    },
  }
}

const getWatchFiles = (metafile: Metafile) =>
  Object.keys(metafile.inputs)
    // esbuild uses "<stdin>" for the virtual entry, skip it.
    .filter((input) => input !== "<stdin>")
    .map((input) => path.resolve(input))
    .filter((input) => !input.includes(`${path.sep}node_modules${path.sep}`))

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

      if (!buildResult.metafile) {
        throw new Error("esbuild did not return the requested metafile")
      }
      // Watch actual source deps so ?transform updates when they change.
      for (const watchFile of getWatchFiles(buildResult.metafile)) {
        this.addWatchFile(watchFile)
      }

      const outputFile = buildResult.outputFiles[0]
      if (!outputFile) {
        throw new Error("esbuild did not emit transformed code")
      }

      return {
        code: `export default ${genString(outputFile.text, { singleQuotes: false })}`,
      }
    },
  }
}
