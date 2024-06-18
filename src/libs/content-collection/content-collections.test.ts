import { describe, expect, test } from "vitest"

import { posts } from "./fixtures/posts"

describe("content-collections", () => {
  test("routes", async () => {
    const routes = await posts.getRoutes()
    expect(routes).toEqual(["/posts/sample-1", "/posts/sample-2"])
  })

  test("files", async () => {
    const files = (await posts.getFiles()).map((file) =>
      file.replace(import.meta.dirname, ""),
    )
    expect(files).toEqual([
      "/fixtures/posts/sample-1/index.mdx",
      "/fixtures/posts/sample-2/index.mdx",
    ])
  })
})
