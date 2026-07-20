import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const workflowUrls = [
  new URL("../../.github/workflows/ci.yml", import.meta.url),
  new URL(
    "../../.github/workflows/publish-to-cloudflare-pages.yml",
    import.meta.url
  ),
] as const

type RenovateRule = {
  description?: string
  matchDatasources?: string[]
  minimumReleaseAge?: string
  internalChecksFilter?: string
  prCreation?: string
  matchUpdateTypes?: string[]
  matchCurrentVersion?: string
  groupName?: string
  automerge?: boolean
  automergeType?: string
  dependencyDashboardApproval?: boolean
}

type RenovateConfig = {
  extends: string[]
  timezone: string
  updateNotScheduled: boolean
  prConcurrentLimit: number
  platformAutomerge: boolean
  lockFileMaintenance: {
    enabled: boolean
    automerge: boolean
    automergeType: string
  }
  packageRules: RenovateRule[]
  automerge: boolean
}

const readRenovateConfig = async (): Promise<RenovateConfig> =>
  JSON.parse(
    await readFile(new URL("../../renovate.json", import.meta.url), "utf8")
  ) as RenovateConfig

const findRule = (
  config: RenovateConfig,
  description: string
): RenovateRule => {
  const rule = config.packageRules.find(
    (candidate) => candidate.description === description
  )
  assert.ok(rule, `Renovate rule not found: ${description}`)
  return rule
}

test("all GitHub Actions are pinned to immutable commit SHAs", async () => {
  for (const workflowUrl of workflowUrls) {
    const workflow = await readFile(workflowUrl, "utf8")
    const actionRefs = [
      ...workflow.matchAll(/^\s+uses:\s+([^\s]+)@([^\s#]+)/gm),
    ]

    assert.notEqual(actionRefs.length, 0)
    for (const match of actionRefs) {
      const action = match[1]
      const ref = match[2]
      assert.ok(action)
      assert.ok(ref)
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

test("security tests run on the Node release with native type stripping", async () => {
  const toolVersions = await readFile(
    new URL("../../.tool-versions", import.meta.url),
    "utf8"
  )
  const packageJson = JSON.parse(
    await readFile(new URL("../../package.json", import.meta.url), "utf8")
  ) as { engines?: { node?: string } }

  assert.match(toolVersions, /^nodejs 24\.\d+\.\d+$/m)
  assert.equal(packageJson.engines?.node, ">=24.16.0")
})

test("Renovate batches dependency updates into a weekly window", async () => {
  const config = await readRenovateConfig()

  assert.ok(config.extends.includes("schedule:weekly"))
  assert.equal(config.timezone, "Asia/Tokyo")
  assert.equal(config.updateNotScheduled, false)
  assert.equal(config.prConcurrentLimit, 3)
})

test("Renovate waits for npm releases to mature", async () => {
  const config = await readRenovateConfig()
  const maturityRule = findRule(config, "Wait for npm releases to mature")

  assert.deepEqual(maturityRule.matchDatasources, ["npm"])
  assert.equal(maturityRule.minimumReleaseAge, "3 days")
  assert.equal(maturityRule.internalChecksFilter, "strict")
  assert.equal(maturityRule.prCreation, "not-pending")
})

test("Renovate automerges only mature, stable non-major npm updates", async () => {
  const config = await readRenovateConfig()
  const stableRule = findRule(config, "Automerge stable non-major npm updates")
  const unstableRule = findRule(config, "Group 0.x npm updates for review")

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
  const config = await readRenovateConfig()
  const majorRule = findRule(
    config,
    "Require dashboard approval for major updates"
  )

  assert.equal(config.lockFileMaintenance.enabled, true)
  assert.equal(config.lockFileMaintenance.automerge, true)
  assert.equal(config.lockFileMaintenance.automergeType, "pr")
  assert.deepEqual(majorRule.matchUpdateTypes, ["major"])
  assert.equal(majorRule.dependencyDashboardApproval, true)
  assert.equal(majorRule.automerge, false)
})
