import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { test } from "node:test"

const linkCardStories = new URL(
  "../../src/components/ui/link-card/link-card.stories.tsx",
  import.meta.url
)

test("LinkCard visual stories use deterministic local image assets", async () => {
  const source = await readFile(linkCardStories, "utf8")

  assert.doesNotMatch(source, /favicon:\s*"https?:\/\//)
  assert.doesNotMatch(source, /src:\s*"https?:\/\//)
})
