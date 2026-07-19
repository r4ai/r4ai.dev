import type { Transformer } from "@r4ai/remark-embed"
import type {
  LinkInfo,
  TransformerLinkCardOptions,
} from "@r4ai/remark-embed/transformers/link-card"
import type { unfurl } from "unfurl.js"

export type LinkMetadata = Partial<Awaited<ReturnType<typeof unfurl>>>

export type LinkMetadataLoader = (
  url: URL,
  signal: AbortSignal
) => Promise<LinkMetadata | null>

export type LinkCardTransformerOptions =
  Required<TransformerLinkCardOptions> & {
    timeoutMs: number
    timeoutStrategy: "per-request" | "shared"
  }

type LinkCardTransformerDependencies = {
  loadMetadata: LinkMetadataLoader
}

export const createLinkCardTransformer = (
  options: LinkCardTransformerOptions,
  dependencies: LinkCardTransformerDependencies
): Transformer => {
  if (!Number.isInteger(options.timeoutMs) || options.timeoutMs <= 0) {
    throw new RangeError("timeoutMs must be a positive integer")
  }

  const metadataCache = new Map<string, Promise<LinkMetadata | null>>()
  let sharedSignal: AbortSignal | undefined

  const getSignal = () => {
    if (options.timeoutStrategy === "per-request") {
      return AbortSignal.timeout(options.timeoutMs)
    }
    return (sharedSignal ??= AbortSignal.timeout(options.timeoutMs))
  }

  const getMetadata = (url: URL) => {
    let metadata = metadataCache.get(url.href)
    if (metadata != null) return metadata

    metadata = dependencies.loadMetadata(url, getSignal()).then(
      (result) => {
        if (result == null) metadataCache.delete(url.href)
        return result
      },
      (error: unknown) => {
        metadataCache.delete(url.href)
        throw error
      }
    )
    metadataCache.set(url.href, metadata)
    return metadata
  }

  const getInfo = async (url: URL) => {
    const metadata = await getMetadata(url)
    if (metadata == null) {
      throw new Error(`No metadata found for ${url.href}`)
    }
    return toLinkInfo(url, metadata)
  }

  return {
    name: "link-card",
    match: async (url) => (await getMetadata(url)) != null,
    tagName: async (url) => options.tagName(await getInfo(url)),
    properties: async (url) => options.properties(await getInfo(url)),
    children: async (url) => options.children(await getInfo(url)),
  }
}

const toLinkInfo = (url: URL, metadata: LinkMetadata): LinkInfo => ({
  url: metadata.open_graph?.url ?? url.href,
  title:
    metadata.open_graph?.title ??
    metadata.title ??
    metadata.twitter_card?.title,
  description:
    metadata.open_graph?.description ??
    metadata.description ??
    metadata.twitter_card?.description,
  favicon: metadata.favicon,
  image: {
    src:
      metadata.open_graph?.images?.at(0)?.url ??
      metadata.twitter_card?.images?.at(0)?.url,
    alt:
      metadata.open_graph?.images?.at(0)?.alt ??
      metadata.twitter_card?.images?.at(0)?.alt,
  },
})
