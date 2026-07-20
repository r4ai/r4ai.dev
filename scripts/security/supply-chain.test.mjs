import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const workflowUrls = [
  new URL("../../.github/workflows/ci.yml", import.meta.url),
  new URL(
    "../../.github/workflows/publish-to-cloudflare-pages.yml",
    import.meta.url
  ),
]

test("all GitHub Actions are pinned to immutable commit SHAs", async () => {
  for (const workflowUrl of workflowUrls) {
    const workflow = await readFile(workflowUrl, "utf8")
    const actionRefs = [
      ...workflow.matchAll(/^\s+uses:\s+([^\s]+)@([^\s#]+)/gm),
    ]

    assert.notEqual(actionRefs.length, 0)
    for (const [, action, ref] of actionRefs) {
      assert.match(
        ref,
        /^[0-9a-f]{40}$/,
        workflowUrl.pathname + ": " + action + " must use a full commit SHA"
      )
    }
  }
})

test("checkout steps do not persist GitHub credentials", async () => {
  for (const workflowUrl of workflowUrls) {
    const workflow = await readFile(workflowUrl, "utf8")
    const checkoutSteps = workflow
      .split("\n      - name: ")
      .filter((step) => step.includes("uses: actions/checkout@"))

    assert.notEqual(checkoutSteps.length, 0)
    for (const step of checkoutSteps) {
      assert.match(step, /persist-credentials:\s*false/)
    }
  }
})

test("the publish workflow cannot deploy pull request code", async () => {
  const workflow = await readFile(workflowUrls[1], "utf8")

  assert.doesNotMatch(workflow, /^\s+pull_request:/m)
})

test("pnpm enforces dependency freshness, trust, and build-script policy", async () => {
  const config = await readFile(
    new URL("../../pnpm-workspace.yaml", import.meta.url),
    "utf8"
  )

  assert.match(config, /^minimumReleaseAge:\s*1440$/m)
  assert.match(config, /^trustPolicy:\s*no-downgrade$/m)
  assert.match(config, /^blockExoticSubdeps:\s*true$/m)
  assert.match(config, /^strictDepBuilds:\s*true$/m)
  assert.match(config, /^allowBuilds:/m)
})

test("Renovate requires review and release maturity for npm updates", async () => {
  const config = JSON.parse(
    await readFile(new URL("../../renovate.json", import.meta.url), "utf8")
  )

  assert.equal(config.automerge, false)
  assert.equal(config.lockFileMaintenance.automerge, undefined)
  assert.deepEqual(config.packageRules[0].matchDatasources, ["npm"])
  assert.equal(config.packageRules[0].minimumReleaseAge, "3 days")
  assert.equal(config.packageRules[0].internalChecksFilter, "strict")
})
