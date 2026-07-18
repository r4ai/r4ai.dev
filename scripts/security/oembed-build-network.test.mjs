import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const componentUrl = new URL(
  "../../src/components/ui/embed/oembed.tsx",
  import.meta.url
)

test("oEmbed fallback rendering does not fetch metadata during builds", async () => {
  const component = await readFile(componentUrl, "utf8")

  assert.doesNotMatch(component, /@r4ai\/remark-embed/)
  assert.doesNotMatch(component, /createResource/)
  assert.match(component, /<Link href=\{props\.url\}>\{props\.url\}<\/Link>/)
})
