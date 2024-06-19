import { describe, expect, test } from "vitest"

import { posts } from "./fixtures/posts"
import {
  fileToRoute,
  getAPIRoutes,
  getFiles,
  getRoutes,
  resolveIndex,
} from "./utils"

describe(resolveIndex.name, () => {
  test("/hoge/index.mdx -> /hoge", () => {
    const actual = resolveIndex("/hoge/index.mdx")
    expect(actual).toBe("/hoge")
  })

  test("/index.mdx -> /", () => {
    const actual = resolveIndex("/index.mdx")
    expect(actual).toBe("/")
  })

  test("/hoge.mdx -> /hoge.mdx", () => {
    const actual = resolveIndex("/hoge.mdx")
    expect(actual).toBe("/hoge.mdx")
  })

  test("/hoge/fuga.json -> /hoge/fuga.json", () => {
    const actual = resolveIndex("/hoge/fuga.json")
    expect(actual).toBe("/hoge/fuga.json")
  })

  test("/hoge/index.mdx.ts -> /hoge/index.mdx.ts", () => {
    const actual = resolveIndex("/hoge/index.mdx.ts")
    expect(actual).toBe("/hoge/index.mdx.ts")
  })

  test("/hoge/fuga/hoge.test/bar/index.mdx -> /hoge/fuga/hoge.test/bar", () => {
    const actual = resolveIndex("/hoge/fuga/hoge.test/bar/index.mdx")
    expect(actual).toBe("/hoge/fuga/hoge.test/bar")
  })
})

describe(getFiles.name, () => {
  test("fixtures/posts", async () => {
    const actual = await getFiles(posts.dirname)
    expect(
      actual.map((file) => file.split(posts.dirname).slice(1).join("")),
    ).toEqual(["/sample-1/index.mdx", "/sample-2/index.mdx"])
  })
})

describe(getRoutes.name, () => {
  test("fixtures/posts", async () => {
    const actual = await getRoutes(posts.dirname, "posts")
    expect(actual).toEqual(["/posts/sample-1", "/posts/sample-2"])
  })
})

describe(fileToRoute.name, () => {
  test("/path/to/posts-dir/posts/sample-1/index.mdx -> /posts/sample-1", () => {
    const actual = fileToRoute(
      `${posts.dirname}/sample-1/index.mdx`,
      posts.dirname,
      "posts",
    )
    expect(actual).toBe("/posts/sample-1")
  })

  test("/path/to/posts-dir/posts/sample-2/index.mdx -> /sample-2", () => {
    const actual = fileToRoute(
      `${posts.dirname}/sample-2/index.mdx`,
      posts.dirname,
    )
    expect(actual).toBe("/sample-2")
  })

  test("/path/to/posts-dir/posts/sample-1/index.mdx -> /dev/posts/sample-1", () => {
    const actual = fileToRoute(
      `${posts.dirname}/sample-1/index.mdx`,
      posts.dirname,
      "dev/posts",
    )
    expect(actual).toBe("/dev/posts/sample-1")
  })
})

describe(getAPIRoutes.name, () => {
  test("fixtures/posts with basePath='api/posts', extensions=['mdx', 'png']", async () => {
    const actual = await getAPIRoutes(posts.dirname, "api/posts", [
      "mdx",
      "png",
    ])
    expect(actual).toEqual([
      "/api/posts/sample-1.mdx",
      "/api/posts/sample-1.png",
      "/api/posts/sample-2.mdx",
      "/api/posts/sample-2.png",
    ])
  })

  test("fixtures/posts with basePath='api', extensions=['mdx']", async () => {
    const actual = await getAPIRoutes(posts.dirname, "api", ["mdx"])
    expect(actual).toEqual(["/api/sample-1.mdx", "/api/sample-2.mdx"])
  })

  test("fixtures/posts with basePath='', extensions=['mdx']", async () => {
    const actual = await getAPIRoutes(posts.dirname, "", ["mdx"])
    expect(actual).toEqual(["/sample-1.mdx", "/sample-2.mdx"])
  })

  test("fixtures/posts with basePath='api/posts', extensions=['mdx', 'png', 'svg', 'json']", async () => {
    const actual = await getAPIRoutes(posts.dirname, "api/posts", [
      "mdx",
      "png",
      "svg",
      "json",
    ])
    expect(actual).toEqual([
      "/api/posts/sample-1.mdx",
      "/api/posts/sample-1.png",
      "/api/posts/sample-1.svg",
      "/api/posts/sample-1.json",
      "/api/posts/sample-2.mdx",
      "/api/posts/sample-2.png",
      "/api/posts/sample-2.svg",
      "/api/posts/sample-2.json",
    ])
  })
})
