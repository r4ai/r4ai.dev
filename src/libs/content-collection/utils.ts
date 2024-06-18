import path from "node:path"

export const resolveIndex = (route: string) => {
  const stem = path.basename(route).split(".").slice(0, -1).join(".")
  if (stem === "index") {
    return path.dirname(route)
  }
  return route
}
