import fs from "node:fs/promises"
import path from "node:path"
import posixPath from "node:path/posix"

export const resolveIndex = (route: string) => {
  const stem = path.basename(route).split(".").slice(0, -1).join(".")
  if (stem === "index") {
    return path.dirname(route)
  }
  return route
}

export const getFiles = async (dir: string) => {
  const allFiles = await fs.readdir(dir)
  const searching: Promise<string[]>[] = []
  for (const file of allFiles) {
    const filePath = path.resolve(dir, file)
    const stat = await fs.stat(filePath)

    // If directory, recursively search files
    if (stat.isDirectory()) {
      searching.push(getFiles(filePath))
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

export const getRoutes = (dir: string, base: string) =>
  getFiles(dir).then((files) =>
    files.map((file) => fileToRoute(file, dir, base)),
  )

export const fileToRoute = (
  file: string,
  dirname: string,
  basePath: string = "",
) =>
  `${basePath && "/"}${posixPath.join(basePath, resolveIndex(file.split(dirname).slice(1).join("")))}`

export const getAPIRoutes = (
  dir: string,
  base: string,
  extensions: string[] = ["mdx", "png"],
) =>
  getRoutes(dir, base).then((routes) =>
    routes.map((route) => extensions.map((ext) => `${route}.${ext}`)).flat(),
  )
