import assert from "node:assert/strict"
import { afterEach, test } from "node:test"

import {
  installStorybookLifecycleObserver,
  waitForStorybookLifecycle,
} from "./storybook-lifecycle.ts"

type EventHandler = (payload: unknown) => void

class FakeChannel {
  readonly handlers = new Map<string, Set<EventHandler>>()

  emit(event: string, payload: unknown) {
    for (const handler of this.handlers.get(event) ?? []) {
      handler(payload)
    }
  }

  off(event: string, handler: EventHandler) {
    this.handlers.get(event)?.delete(handler)
  }

  on(event: string, handler: EventHandler) {
    const handlers = this.handlers.get(event) ?? new Set<EventHandler>()
    handlers.add(handler)
    this.handlers.set(event, handlers)
  }
}

const setStorybookWindow = (
  channel: FakeChannel | undefined,
  storyId = "ui-button--default"
) => {
  Object.assign(globalThis, {
    window: {
      __STORYBOOK_ADDONS_CHANNEL__: channel,
      location: {
        search: storyId ? `?id=${storyId}&viewMode=story` : "",
      },
    },
  })
}

afterEach(() => {
  Reflect.deleteProperty(globalThis, "window")
})

test("waits for the URL-selected story to finish successfully", async () => {
  const channel = new FakeChannel()
  setStorybookWindow(channel)
  installStorybookLifecycleObserver()

  channel.emit("storyFinished", {
    storyId: "ui-button--default",
    status: "success",
  })

  await waitForStorybookLifecycle()
  assert.equal(channel.handlers.get("storyFinished")?.size, 0)
})

test("ignores completion events for a different story", async () => {
  const channel = new FakeChannel()
  setStorybookWindow(channel)
  installStorybookLifecycleObserver()

  let completed = false
  const rendered = waitForStorybookLifecycle().then(() => {
    completed = true
  })

  channel.emit("storyFinished", {
    storyId: "ui-button--destructive",
    status: "success",
  })
  await Promise.resolve()
  assert.equal(completed, false)

  channel.emit("storyFinished", {
    storyId: "ui-button--default",
    status: "success",
  })
  await rendered
})

test("rejects when Storybook reports a render or play failure", async () => {
  const channel = new FakeChannel()
  setStorybookWindow(channel)
  installStorybookLifecycleObserver()

  channel.emit("storyFinished", {
    storyId: "ui-button--default",
    status: "error",
  })

  await assert.rejects(waitForStorybookLifecycle(), /ui-button--default/)
  assert.equal(channel.handlers.get("storyFinished")?.size, 0)
})

test("connects when the Storybook channel becomes available later", async () => {
  const channel = new FakeChannel()
  setStorybookWindow(undefined)
  installStorybookLifecycleObserver()

  Object.assign(globalThis.window, {
    __STORYBOOK_ADDONS_CHANNEL__: channel,
  })
  await new Promise((resolve) => setTimeout(resolve, 0))

  channel.emit("storyFinished", {
    storyId: "ui-button--default",
    status: "success",
  })

  await waitForStorybookLifecycle()
})

test("rejects when no story is selected by the URL", async () => {
  setStorybookWindow(new FakeChannel(), "")
  installStorybookLifecycleObserver()

  await assert.rejects(
    waitForStorybookLifecycle(),
    /Storybook lifecycle observer is not installed/
  )
})
