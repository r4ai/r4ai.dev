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

test("deployment provisions the project Node version before running Wrangler", async () => {
  const workflow = await readFile(workflowUrl, "utf8")
  const toolVersions = await readFile(
    new URL("../../.tool-versions", import.meta.url),
    "utf8"
  )
  const nodeVersion = toolVersions.match(/^nodejs (\S+)$/m)?.[1]
  assert.ok(nodeVersion)

  const deploy = workflow.slice(workflow.indexOf("\n  deploy:"))
  const setup = deploy.indexOf("uses: jdx/mise-action@")
  const publish = deploy.indexOf("uses: cloudflare/wrangler-action@")
  assert.ok(setup >= 0 && setup < publish)
  assert.ok(
    deploy
      .slice(setup, publish)
      .includes(`tool_versions: "nodejs ${nodeVersion}"`)
  )
  assert.doesNotMatch(deploy, /uses: actions\/checkout@/)
})
