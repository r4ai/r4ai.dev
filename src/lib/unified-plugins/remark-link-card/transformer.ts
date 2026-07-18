import type { Transformer } from "@r4ai/remark-embed"
import type { ElementContent, Properties } from "hast"

export type LinkMetadata = {
  title?: string
  description?: string
  favicon?: string
  open_graph?: {
    url?: string
    title?: string
    description?: string
    images?: Array<{
      url?: string
      alt?: string
    }>
  }
  twitter_card?: {
    title?: string
    description?: string
    images?: Array<{
      url?: string
      alt?: string
    }>
  }
}

export type LinkInfo = {
  url: string
  title?: string
  description?: string
  favicon?: string
  image: {
    src?: string
    alt?: string
  }
}

export type LinkMetadataLoader = (
  url: URL,
  signal: AbortSignal
) => Promise<LinkMetadata | null>

export type LinkCardTransformerOptions = {
  timeoutMs: number
  tagName: (info: Readonly<LinkInfo>) => string | Promise<string>
  properties: (info: Readonly<LinkInfo>) => Properties | Promise<Properties>
  children: (
    info: Readonly<LinkInfo>
  ) => ElementContent[] | Promise<ElementContent[]>
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

  const metadataCache = new Map<string, LinkMetadata>()
  const loadingCache = new Map<string, Promise<LinkMetadata | null>>()
  let requestSignal: AbortSignal | undefined

  const getMetadata = async (url: URL) => {
    const cached = metadataCache.get(url.href)
    if (cached != null) return cached

    let loading = loadingCache.get(url.href)
    if (loading == null) {
      requestSignal ??= AbortSignal.timeout(options.timeoutMs)
      loading = dependencies.loadMetadata(url, requestSignal)
      loadingCache.set(url.href, loading)
    }

    try {
      const metadata = await loading
      if (metadata != null) metadataCache.set(url.href, metadata)
      return metadata
    } finally {
      loadingCache.delete(url.href)
    }
  }

  const getInfo = (url: URL) => {
    const metadata = metadataCache.get(url.href)
    if (metadata == null) {
      throw new Error(`No metadata found for ${url.href}`)
    }
    return toLinkInfo(url, metadata)
  }

  return {
    name: "link-card",
    match: async (url) => (await getMetadata(url)) != null,
    tagName: async (url) => options.tagName(getInfo(url)),
    properties: async (url) => options.properties(getInfo(url)),
    children: async (url) => options.children(getInfo(url)),
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
