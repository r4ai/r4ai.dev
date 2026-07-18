import { expect, test } from "@playwright/test"

import {
  installStorybookLifecycleObserver,
  waitForStorybookLifecycle,
} from "./storybook-lifecycle"

interface StoryIndexEntry {
  id: string
  name: string
  title: string
  type: "docs" | "story"
  tags?: string[]
}

interface StoryIndex {
  entries: Record<string, StoryIndexEntry>
}

test("all Storybook stories match their visual snapshots", async ({
  page,
  request,
}) => {
  const indexResponse = await request.get("/index.json")

  expect(indexResponse.ok()).toBe(true)

  const index = (await indexResponse.json()) as StoryIndex
  const stories = Object.values(index.entries)
    .filter(
      (entry) => entry.type === "story" && !entry.tags?.includes("skip-vrt")
    )
    .sort((left, right) => left.id.localeCompare(right.id))

  expect(stories.length).toBeGreaterThan(0)

  await page.addInitScript(installStorybookLifecycleObserver)

  for (const story of stories) {
    await test.step(`${story.title} / ${story.name}`, async () => {
      await page.goto(
        `/iframe.html?id=${encodeURIComponent(story.id)}&viewMode=story`,
        { waitUntil: "load" }
      )
      await page.evaluate(waitForStorybookLifecycle)

      await expect(page.locator("body")).toHaveClass(/sb-show-main/)
      await page.evaluate(async () => {
        await document.fonts.ready
        await Promise.all(
          [...document.images].map(async (image) => {
            if (!image.complete) {
              await new Promise<void>((resolve) => {
                image.addEventListener("load", () => resolve(), { once: true })
                image.addEventListener("error", () => resolve(), { once: true })
              })
            }
            await image.decode().catch(() => undefined)
          })
        )
      })
      await expect.soft(page).toHaveScreenshot(`${story.id}.png`, {
        animations: "disabled",
        caret: "hide",
        fullPage: true,
        mask: [page.locator("canvas")],
      })
    })
  }
})
