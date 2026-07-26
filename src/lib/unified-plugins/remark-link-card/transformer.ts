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

const firstPresent = <T>(
  values: readonly (T | null | undefined)[]
): T | undefined => values.find((value): value is T => value != null)

type MetadataCandidate = {
  url?: string
  title?: string
  description?: string
  imageUrl?: string
  imageAlt?: string
}

const getOpenGraphCandidate = (metadata: LinkMetadata): MetadataCandidate => {
  const openGraph = metadata.open_graph
  if (!openGraph) return {}

  const image = openGraph.images?.at(0)
  return {
    url: openGraph.url,
    title: openGraph.title,
    description: openGraph.description,
    imageUrl: image?.url,
    imageAlt: image?.alt,
  }
}

const getTwitterCardCandidate = (metadata: LinkMetadata): MetadataCandidate => {
  const twitterCard = metadata.twitter_card
  if (!twitterCard) return {}

  const image = twitterCard.images?.at(0)
  return {
    title: twitterCard.title,
    description: twitterCard.description,
    imageUrl: image?.url,
    imageAlt: image?.alt,
  }
}

const toLinkInfo = (url: URL, metadata: LinkMetadata): LinkInfo => {
  const openGraph = getOpenGraphCandidate(metadata)
  const twitterCard = getTwitterCardCandidate(metadata)

  // Prefer Open Graph, then document metadata, then Twitter Card metadata.
  // Images have no document-level candidate, so they use Open Graph then Twitter.
  return {
    url: openGraph.url ?? url.href,
    title: firstPresent([openGraph.title, metadata.title, twitterCard.title]),
    description: firstPresent([
      openGraph.description,
      metadata.description,
      twitterCard.description,
    ]),
    favicon: metadata.favicon,
    image: {
      src: firstPresent([openGraph.imageUrl, twitterCard.imageUrl]),
      alt: firstPresent([openGraph.imageAlt, twitterCard.imageAlt]),
    },
  }
}
