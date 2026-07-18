import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const workflowUrl = new URL("../../.github/workflows/ci.yml", import.meta.url)

test("CI build job has a bounded execution time", async () => {
  const workflow = await readFile(workflowUrl, "utf8")
  const buildStart = workflow.indexOf("  build:")
  const nextJobStart = workflow.indexOf("\n  storybook-vrt:", buildStart)

  assert.notEqual(buildStart, -1)
  assert.notEqual(nextJobStart, -1)

  const buildJob = workflow.slice(buildStart, nextJobStart)
  assert.match(buildJob, /^ {4}timeout-minutes: 10$/m)
})
