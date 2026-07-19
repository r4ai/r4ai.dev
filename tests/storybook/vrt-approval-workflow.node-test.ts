import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { test } from "node:test"

const workflow = await readFile(
  new URL("../../.github/workflows/ci.yml", import.meta.url),
  "utf8"
)

test("clears a consumed VRT approval label in an isolated job", () => {
  const cleanupJob = workflow.match(
    /^ {2}storybook-vrt-clear-approval:\n(?<body>[\s\S]*?)(?=^ {2}\S|(?![\s\S]))/m
  )?.groups?.body

  assert.ok(cleanupJob, "missing storybook-vrt-clear-approval job")
  assert.match(cleanupJob, /needs: storybook-vrt/)
  assert.match(cleanupJob, /pull-requests: write/)
  assert.match(cleanupJob, /github\.event\.action == 'labeled'/)
  assert.match(cleanupJob, /github\.event\.label\.name == 'vrt-approved'/)
  assert.match(cleanupJob, /--method DELETE/)
  assert.doesNotMatch(cleanupJob, /actions\/checkout/)
  assert.doesNotMatch(cleanupJob, /pnpm/)
})

test("builds the VRT baseline with base revision dependencies", () => {
  const vrtJob = workflow.match(
    /^ {2}storybook-vrt:\n(?<body>[\s\S]*?)(?=^ {2}\S|(?![\s\S]))/m
  )?.groups?.body

  assert.ok(vrtJob, "missing storybook-vrt job")
  assert.match(vrtJob, /pnpm --dir \.vrt\/base install --frozen-lockfile/)
  assert.match(vrtJob, /pnpm --dir \.vrt\/base run build-storybook/)
  assert.doesNotMatch(vrtJob, /cp -R \.storybook/)
})
