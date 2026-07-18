import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const workflowUrl = new URL(
  "../../.github/workflows/publish-to-cloudflare-pages.yml",
  import.meta.url
)

test("Cloudflare Pages deployment pins the Wrangler version", async () => {
  const workflow = await readFile(workflowUrl, "utf8")
  const wranglerVersion = workflow.match(
    /wranglerVersion:\s*["']([^"']+)["']/
  )?.[1]

  assert.match(wranglerVersion ?? "", /^\d+\.\d+\.\d+$/)
})
