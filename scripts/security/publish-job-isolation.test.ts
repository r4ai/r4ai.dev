import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const workflowUrl = new URL(
  "../../.github/workflows/publish-to-cloudflare-pages.yml",
  import.meta.url
)

test("Cloudflare credentials are isolated from the build job", async () => {
  const workflow = await readFile(workflowUrl, "utf8")

  assert.match(workflow, /^ {2}build:/m)
  assert.match(workflow, /^ {2}deploy:\n {4}needs: build/m)

  const buildStart = workflow.indexOf("  build:")
  const deployStart = workflow.indexOf("\n  deploy:")
  const buildJob = workflow.slice(buildStart, deployStart)

  assert.notEqual(buildStart, -1)
  assert.notEqual(deployStart, -1)
  assert.doesNotMatch(buildJob, /CLOUDFLARE_|cloudflare\/wrangler-action/)
  assert.match(buildJob, /actions\/upload-artifact@[0-9a-f]{40}/)

  const deployJob = workflow.slice(deployStart)
  assert.match(deployJob, /actions\/download-artifact@[0-9a-f]{40}/)
  assert.match(deployJob, /sha256sum --check dist\.tar\.sha256/)
  assert.match(deployJob, /CLOUDFLARE_|cloudflare\/wrangler-action/)
})
