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

test("the publish workflow deploys pull request previews", async () => {
  const workflow = await readFile(workflowUrls[1], "utf8")

  assert.match(workflow, /^\s+pull_request:/m)
  assert.match(workflow, /^\s+branches:\n\s+- main$/m)
  assert.match(
    workflow,
    /github\.event\.pull_request\.head\.repo\.full_name == github\.repository/
  )
  assert.doesNotMatch(workflow, /cloudflare\/pages-action/)
  assert.match(workflow, /cloudflare\/wrangler-action@[0-9a-f]{40}/)
  assert.match(
    workflow,
    /--branch=\${{ github\.event_name == 'pull_request' && github\.head_ref \|\| github\.ref_name }}/
  )
})

test("pnpm enforces dependency freshness, trust, and build-script policy", async () => {
  const config = await readFile(
    new URL("../../pnpm-workspace.yaml", import.meta.url),
    "utf8"
  )

  assert.match(config, /^minimumReleaseAge:\s*4320$/m)
  assert.match(config, /^trustPolicy:\s*no-downgrade$/m)
  assert.match(config, /^blockExoticSubdeps:\s*true$/m)
  assert.match(config, /^strictDepBuilds:\s*true$/m)
  assert.match(config, /^allowBuilds:/m)
})

test("Renovate batches dependency updates into a weekly window", async () => {
  const config = JSON.parse(
    await readFile(new URL("../../renovate.json", import.meta.url), "utf8")
  )

  assert.ok(config.extends.includes("schedule:weekly"))
  assert.equal(config.timezone, "Asia/Tokyo")
  assert.equal(config.updateNotScheduled, false)
  assert.equal(config.prConcurrentLimit, 3)
})

test("Renovate waits for npm releases to mature", async () => {
  const config = JSON.parse(
    await readFile(new URL("../../renovate.json", import.meta.url), "utf8")
  )
  const maturityRule = config.packageRules.find(
    (rule) => rule.description === "Wait for npm releases to mature"
  )

  assert.deepEqual(maturityRule.matchDatasources, ["npm"])
  assert.equal(maturityRule.minimumReleaseAge, "3 days")
  assert.equal(maturityRule.internalChecksFilter, "strict")
  assert.equal(maturityRule.prCreation, "not-pending")
})

test("Renovate automerges only mature, stable non-major npm updates", async () => {
  const config = JSON.parse(
    await readFile(new URL("../../renovate.json", import.meta.url), "utf8")
  )
  const stableRule = config.packageRules.find(
    (rule) => rule.description === "Automerge stable non-major npm updates"
  )
  const unstableRule = config.packageRules.find(
    (rule) => rule.description === "Group 0.x npm updates for review"
  )

  assert.equal(config.automerge, false)
  assert.equal(config.platformAutomerge, false)
  assert.deepEqual(stableRule.matchDatasources, ["npm"])
  assert.deepEqual(stableRule.matchUpdateTypes, ["minor", "patch"])
  assert.equal(stableRule.matchCurrentVersion, "!/^0/")
  assert.equal(stableRule.groupName, "stable non-major npm updates")
  assert.equal(stableRule.automerge, true)
  assert.equal(stableRule.automergeType, "pr")
  assert.equal(unstableRule.matchCurrentVersion, "/^0\\./")
  assert.equal(unstableRule.groupName, "0.x npm updates")
  assert.equal(unstableRule.automerge, false)
})

test("Renovate automerges lockfile maintenance but gates major updates", async () => {
  const config = JSON.parse(
    await readFile(new URL("../../renovate.json", import.meta.url), "utf8")
  )
  const majorRule = config.packageRules.find(
    (rule) =>
      rule.description === "Require dashboard approval for major updates"
  )

  assert.equal(config.lockFileMaintenance.enabled, true)
  assert.equal(config.lockFileMaintenance.automerge, true)
  assert.equal(config.lockFileMaintenance.automergeType, "pr")
  assert.deepEqual(majorRule.matchUpdateTypes, ["major"])
  assert.equal(majorRule.dependencyDashboardApproval, true)
  assert.equal(majorRule.automerge, false)
})
