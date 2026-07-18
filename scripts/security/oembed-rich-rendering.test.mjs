import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const componentUrl = new URL(
  "../../src/components/ui/embed/oembed-rich.tsx",
  import.meta.url
)

test("rich oEmbed rendering does not inject provider HTML", async () => {
  const component = await readFile(componentUrl, "utf8")

  assert.doesNotMatch(component, /innerHTML/)
  assert.doesNotMatch(component, /JSON\.parse\(props\.oEmbed\)/)
  assert.match(component, /<Link href=\{props\.url\}>\{props\.url\}<\/Link>/)
})
