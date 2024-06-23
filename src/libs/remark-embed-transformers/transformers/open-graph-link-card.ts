import type { Transformer } from "@r4ai/remark-embed"
import { unfurl } from "unfurl.js"
import type { Metadata } from "unfurl.js/dist/types"

export type OpenGraph = {
  title?: string
  description?: string
  url: string
  favicon?: string
  image?: {
    src?: string
    alt?: string
  }
}

export const transformerOpenGraphLinkCard = (): Transformer => {
  const cache = new Map<string, Metadata>()

  return {
    name: "link-card",
    tagName: "link-card",
    properties: (url: URL) => {
      const metadata = cache.get(url.href)
      if (metadata == null) return {}

      const og: OpenGraph = {
        url: metadata.open_graph.url ?? url.href,
        title:
          metadata.open_graph.title ??
          metadata.title ??
          metadata.twitter_card.title,
        description:
          metadata.open_graph.description ??
          metadata.description ??
          metadata.twitter_card.description,
        favicon: metadata.favicon,
        image: {
          src:
            metadata.open_graph.images?.at(0)?.url ??
            metadata.twitter_card.images?.at(0)?.url,
          alt:
            metadata.open_graph.images?.at(0)?.alt ??
            metadata.twitter_card.images?.at(0)?.alt,
        },
      }
      return {
        og: JSON.stringify(og),
      }
    },
    children: [],
    match: async (url) => {
      const metadata = await unfurl(url.href)
      if (metadata == null) return false

      cache.set(url.href, metadata)
      return true
    },
  }
}
