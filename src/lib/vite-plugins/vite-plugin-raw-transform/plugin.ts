import { readFile } from "node:fs/promises"
import path from "node:path"

import { build, type Loader, type Plugin as ESBuildPlugin } from "esbuild"
import { genString } from "knitwork"
import { type Plugin } from "vite"

const loadersByExtension: Readonly<Record<string, Loader>> = {
  ".js": "js",
  ".ts": "ts",
  ".jsx": "jsx",
  ".tsx": "tsx",
}

const getLoader = (filePath: string): Loader => {
  const loader = loadersByExtension[path.extname(filePath)]
  if (loader) return loader
  throw new Error(`Unsupported source extension: ${path.extname(filePath)}`)
}

const constantFoldingPlugin = ({
  platform,
}: {
  platform: "node" | "browser"
}): ESBuildPlugin => ({
  name: "constant-folding",
  setup(build) {
    build.onLoad({ filter: /\.(js|ts|jsx|tsx)$/ }, async (args) => {
      const source = await readFile(args.path, "utf-8")

      // Replace `typeof window === "undefined"` with `true` or `false` depending on the platform
      return {
        contents:
          platform === "node"
            ? source.replaceAll('typeof window === "undefined"', "true")
            : source.replaceAll('typeof window === "undefined"', "false"),
        loader: getLoader(args.path),
      }
    })
  },
})

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
export const rawTransformPlugin = (): Plugin => ({
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
    for (const input of Object.keys(buildResult.metafile.inputs)) {
      const resolvedInput = path.resolve(input)
      // esbuild uses "<stdin>" for the virtual entry, skip it.
      if (
        input === "<stdin>" ||
        resolvedInput.includes(`${path.sep}node_modules${path.sep}`)
      ) {
        continue
      }
      this.addWatchFile(resolvedInput)
    }

    const outputFile = buildResult.outputFiles[0]
    if (!outputFile) {
      throw new Error("esbuild did not emit transformed code")
    }

    return {
      code: `export default ${genString(outputFile.text, { singleQuotes: false })}`,
    }
  },
})
