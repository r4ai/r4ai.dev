import type { Transformer } from "@r4ai/remark-embed"
import type {
  LinkInfo,
  TransformerLinkCardOptions,
} from "@r4ai/remark-embed/transformers/link-card"
import type { unfurl } from "unfurl.js"

export type LinkMetadata = Partial<Awaited<ReturnType<typeof unfurl>>>

type OpenGraph = NonNullable<LinkMetadata["open_graph"]>
type TwitterCard = NonNullable<LinkMetadata["twitter_card"]>
type OpenGraphImage = NonNullable<OpenGraph["images"]>[number]
type TwitterCardImage = NonNullable<TwitterCard["images"]>[number]

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

const toLinkInfo = (url: URL, metadata: LinkMetadata): LinkInfo => {
  const openGraph = (metadata.open_graph ?? {}) as Partial<OpenGraph>
  const twitterCard = (metadata.twitter_card ?? {}) as Partial<TwitterCard>
  const [openGraphImage = {} as Partial<OpenGraphImage>] =
    openGraph.images ?? []
  const [twitterCardImage = {} as Partial<TwitterCardImage>] =
    twitterCard.images ?? []

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
      src: firstPresent([openGraphImage.url, twitterCardImage.url]),
      alt: firstPresent([openGraphImage.alt, twitterCardImage.alt]),
    },
  }
}
