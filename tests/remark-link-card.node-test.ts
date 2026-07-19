import assert from "node:assert/strict"
import { createServer, type Server } from "node:http"
import { afterEach, test } from "node:test"

import {
  createLinkCardTransformer,
  type LinkMetadata,
  type LinkMetadataLoader,
  loadLinkMetadata,
} from "../src/lib/unified-plugins/remark-link-card/index.ts"

const servers = new Set<Server>()

afterEach(async () => {
  await Promise.all(
    [...servers].map(
      (server) =>
        new Promise<void>((resolve, reject) => {
          server.closeAllConnections()
          server.close((error) => {
            if (error) reject(error)
            else resolve()
          })
        })
    )
  )
  servers.clear()
})

test("aborts link metadata requests that stop responding", async () => {
  const server = createServer(() => {
    // Deliberately leave the response open to reproduce the CI hang.
  })
  servers.add(server)

  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", resolve)
  })

  const address = server.address()
  assert.notEqual(address, null)
  assert.equal(typeof address, "object")

  const signal = AbortSignal.timeout(50)
  const url = new URL(`http://127.0.0.1:${address.port}`)

  await assert.rejects(
    loadLinkMetadata(url, signal),
    (error: unknown) =>
      error instanceof DOMException && error.name === "TimeoutError"
  )
})

test("reuses metadata after the first successful request", async () => {
  let requestCount = 0
  const loadMetadata: LinkMetadataLoader = async (url) => {
    requestCount += 1
    return {
      title: "Cached title",
      open_graph: {
        title: "Cached title",
        type: "website",
        url: url.href,
      },
    }
  }
  const transformer = createLinkCardTransformer(
    {
      timeoutMs: 1_000,
      timeoutStrategy: "shared",
      tagName: () => "link-card",
      properties: (info) => ({ title: info.title }),
      children: () => [],
    },
    { loadMetadata }
  )
  const url = new URL("https://example.com/article")

  assert.equal(await transformer.match(url), true)
  assert.equal(await transformer.match(url), true)
  assert.equal(requestCount, 1)
  assert.deepEqual(await transformer.properties(url), {
    title: "Cached title",
  })
})

test("shares an in-flight request for duplicate links", async () => {
  let requestCount = 0
  let resolveRequest: ((metadata: LinkMetadata) => void) | undefined
  const pendingMetadata = new Promise<LinkMetadata>((resolve) => {
    resolveRequest = resolve
  })
  const loadMetadata: LinkMetadataLoader = async () => {
    requestCount += 1
    return pendingMetadata
  }
  const transformer = createLinkCardTransformer(
    {
      timeoutMs: 1_000,
      timeoutStrategy: "shared",
      tagName: () => "link-card",
      properties: () => ({}),
      children: () => [],
    },
    { loadMetadata }
  )
  const url = new URL("https://example.com/shared")

  const firstMatch = transformer.match(url)
  const secondMatch = transformer.match(url)

  assert.equal(requestCount, 1)
  resolveRequest?.({ title: "Shared metadata" })
  assert.deepEqual(await Promise.all([firstMatch, secondMatch]), [true, true])
})

test("retries metadata after a failed request", async () => {
  let requestCount = 0
  const loadMetadata: LinkMetadataLoader = async () => {
    requestCount += 1
    if (requestCount === 1) throw new Error("temporary failure")
    return { title: "Recovered" }
  }
  const transformer = createLinkCardTransformer(
    {
      timeoutMs: 1_000,
      timeoutStrategy: "shared",
      tagName: () => "link-card",
      properties: () => ({}),
      children: () => [],
    },
    { loadMetadata }
  )
  const url = new URL("https://example.com/retry")

  await assert.rejects(transformer.match(url), /temporary failure/)
  assert.equal(await transformer.match(url), true)
  assert.equal(requestCount, 2)
})

test("shares one timeout budget across sequential requests", async () => {
  const keepEventLoopAlive = setTimeout(() => {}, 200)
  const signals: AbortSignal[] = []
  const loadMetadata: LinkMetadataLoader = async (_, signal) => {
    signals.push(signal)
    if (signal.aborted) throw signal.reason
    return new Promise((_, reject) => {
      signal.addEventListener("abort", () => reject(signal.reason), {
        once: true,
      })
    })
  }
  const transformer = createLinkCardTransformer(
    {
      timeoutMs: 50,
      timeoutStrategy: "shared",
      tagName: () => "link-card",
      properties: () => ({}),
      children: () => [],
    },
    { loadMetadata }
  )

  try {
    await assert.rejects(
      transformer.match(new URL("https://example.com/first")),
      (error: unknown) =>
        error instanceof DOMException && error.name === "TimeoutError"
    )

    await assert.rejects(
      transformer.match(new URL("https://example.com/second")),
      (error: unknown) =>
        error instanceof DOMException && error.name === "TimeoutError"
    )
    assert.equal(signals.length, 2)
    assert.equal(signals[1], signals[0])
    assert.equal(signals[1]?.aborted, true)
  } finally {
    clearTimeout(keepEventLoopAlive)
  }
})

test("starts a fresh timeout budget for later development requests", async () => {
  const keepEventLoopAlive = setTimeout(() => {}, 200)
  const signals: AbortSignal[] = []
  const loadMetadata: LinkMetadataLoader = async (url, signal) => {
    assert.equal(signal.aborted, false)
    signals.push(signal)
    return { title: url.href }
  }
  const transformer = createLinkCardTransformer(
    {
      timeoutMs: 20,
      timeoutStrategy: "per-request",
      tagName: () => "link-card",
      properties: () => ({}),
      children: () => [],
    },
    { loadMetadata }
  )

  try {
    assert.equal(
      await transformer.match(new URL("https://example.com/first")),
      true
    )
    const [firstSignal] = signals
    assert.ok(firstSignal)
    await new Promise<void>((resolve) => {
      if (firstSignal.aborted) {
        resolve()
        return
      }
      firstSignal.addEventListener("abort", () => resolve(), { once: true })
    })

    assert.equal(
      await transformer.match(new URL("https://example.com/later")),
      true
    )
    assert.equal(signals.length, 2)
    assert.notEqual(signals[1], firstSignal)
  } finally {
    clearTimeout(keepEventLoopAlive)
  }
})

test("does not cache missing metadata", async () => {
  let callCount = 0
  const loadMetadata: LinkMetadataLoader = async () => {
    callCount += 1
    return null
  }
  const transformer = createLinkCardTransformer(
    {
      timeoutMs: 1_000,
      timeoutStrategy: "shared",
      tagName: () => "link-card",
      properties: () => ({}),
      children: () => [],
    },
    { loadMetadata }
  )

  assert.equal(await transformer.match(new URL("https://example.com")), false)
  assert.equal(await transformer.match(new URL("https://example.com")), false)
  assert.equal(callCount, 2)
})

test("rejects invalid timeout values", () => {
  assert.throws(
    () =>
      createLinkCardTransformer(
        {
          timeoutMs: 0,
          timeoutStrategy: "shared",
          tagName: () => "link-card",
          properties: () => ({}),
          children: () => [],
        },
        { loadMetadata: async () => null }
      ),
    /timeoutMs must be a positive integer/
  )
})
