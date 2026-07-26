import { codeToHtml } from "shiki"
import { describe, expect, test } from "vitest"

import { transformerMetaDiff } from "./meta-diff"

describe("transformerMetaDiff", () => {
  test("marks diff lines and removes the diff indentation", async () => {
    const html = await codeToHtml(
      [
        "+ const added = true",
        "- const removed = false",
        "  const context = 0",
      ].join("\n"),
      {
        lang: "ts",
        theme: "github-light",
        transformers: [transformerMetaDiff()],
        meta: { __raw: "diff" },
      }
    )

    expect(html).toContain('class="line diff add"')
    expect(html).toContain('class="line diff remove"')
    expect(html).toContain(">const</span>")
    expect(html).not.toContain(">+</span>")
    expect(html).not.toContain(">-</span>")
  })

  test("does not transform code without the diff meta flag", async () => {
    const html = await codeToHtml("+ const unchanged = true", {
      lang: "ts",
      theme: "github-light",
      transformers: [transformerMetaDiff()],
    })

    expect(html).not.toContain("has-diff")
    expect(html).not.toContain("line diff add")
    expect(html).toContain(">+</span>")
  })
})
