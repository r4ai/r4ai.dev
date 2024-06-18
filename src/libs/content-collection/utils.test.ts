import { describe, expect, test } from "vitest"

import { resolveIndex } from "./utils"

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
