import * as fs from "node:fs/promises"
import posixPath from "node:path/posix"

import type { Hono } from "hono"

import { fileToRouteFrom, getFilesOf } from "./utils"

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
  const getFiles = (dir: string = dirname) => getFilesOf(dir, 1)

  const fileToRoute = (file: string, dir: string = dirname) =>
    fileToRouteFrom(file, dir, basePath)

  const getRoutes = (dir: string = dirname) =>
    getFiles(dir).then((files) => files.map((file) => fileToRoute(file, dir)))

  const getAPIRoutes = (
    extensions: string[] = ["mdx", "png"],
    dir: string = dirname,
  ) =>
    getRoutes(dir).then((routes) =>
      routes
        .map((route) =>
          extensions.map((ext) => `/${posixPath.join("api", route)}.${ext}`),
        )
        .flat(),
    )

  const getFile = async (route: string, dir: string = dirname) => {
    const files = await getFiles(dir)
    return files.find((file) => fileToRoute(file) === route)
  }

  const registerAPI = async (app: Hono, dir: string = dirname) => {
    const files = await getFiles(dir)

    for (const file of files) {
      const route = fileToRoute(file, dir)

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
    dirname,
    getFiles,
    getRoutes,
    getAPIRoutes,
    fileToRoute,
    getFile,
    registerAPI,
  } as const
}
