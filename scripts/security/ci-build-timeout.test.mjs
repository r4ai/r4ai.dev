import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const workflows = {
  CI: new URL("../../.github/workflows/ci.yml", import.meta.url),
  publish: new URL(
    "../../.github/workflows/publish-to-cloudflare-pages.yml",
    import.meta.url
  ),
}

for (const [name, workflowUrl] of Object.entries(workflows)) {
  test(`${name} build job has a bounded execution time`, async () => {
    const workflow = await readFile(workflowUrl, "utf8")
    const buildJob = workflow.match(
      /^ {2}build:\n(?:(?!^ {2}\S).*(?:\n|$))*/m
    )?.[0]

    assert.notEqual(buildJob, undefined)
    assert.match(buildJob, /^ {4}timeout-minutes: 10$/m)
  })
}
