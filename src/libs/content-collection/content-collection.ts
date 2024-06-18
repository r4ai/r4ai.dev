import * as fs from "node:fs/promises"
import path from "node:path"
import posixPath from "node:path/posix"

import type { Hono } from "hono"

import { resolveIndex } from "./utils"

type CollectionOptions<Schema> = {
  basePath: string
  dirname: string
  schema: Schema
}

export const defineCollection = <Schema>({
  basePath,
  dirname,
  schema,
}: CollectionOptions<Schema>) => {
  const _files = async (dir: string, level: number) => {
    // Only support one level deep because vite only supports one level deep dynamic imports
    // @see https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#globs-only-go-one-level-deep
    if (level > 3) return []

    const allFiles = await fs.readdir(dir)
    const searching: Promise<string[]>[] = []
    for (const file of allFiles) {
      const filePath = path.resolve(dir, file)
      const stat = await fs.stat(filePath)

      // If directory, recursively search files
      if (stat.isDirectory()) {
        searching.push(_files(filePath, level + 1))
        continue
      }

      // If index.mdx file, add to files
      if (file === "index.mdx") {
        searching.push(new Promise((resolve) => resolve([filePath])))
        continue
      }
    }

    const files = (await Promise.all(searching)).flat()
    return files
  }

  const getFiles = () => _files(dirname, 1)

  const fileToRoute = (file: string) =>
    `/${posixPath.join(basePath, resolveIndex(file.replace(dirname, "")))}`

  const getRoutes = () => getFiles().then((files) => files.map(fileToRoute))

  const getFile = async (route: string) => {
    const files = await getFiles()
    return files.find((file) => fileToRoute(file) === route)
  }

  const registerAPI = async (app: Hono) => {
    const files = await getFiles()

    for (const file of files) {
      const route = fileToRoute(file)

      // Raw MDX file
      app.get(`${route}.mdx`, async () => {
        const code = await fs.readFile(file, "utf-8")
        return new Response(code, {
          headers: {
            "Content-Type": "text/mdx; charset=utf-8",
          },
        })
      })

      // OG Image
      app.get(`${route}.png`, async (c) => {
        // todo: implement
        return c.text("Not implemented", { status: 501 })
      })
    }
  }

  return {
    basePath,
    schema,
    getFiles,
    getRoutes,
    fileToRoute,
    getFile,
    registerAPI,
  } as const
}
