import { unfurl } from "unfurl.js"

import type { LinkMetadata, LinkMetadataLoader } from "./transformer.ts"

type UnfurlOptions = NonNullable<Parameters<typeof unfurl>[1]>
type UnfurlFetch = NonNullable<UnfurlOptions["fetch"]>
type UnfurlResponse = Awaited<ReturnType<UnfurlFetch>>

const requestHeaders = {
  Accept: "text/html, application/xhtml+xml",
  "User-Agent": "facebookexternalhit",
}

export const loadLinkMetadata: LinkMetadataLoader = async (url, signal) => {
  const fetchWithSignal: UnfurlFetch = async (input) => {
    const response = await fetch(input, {
      headers: requestHeaders,
      redirect: "follow",
      signal,
    })
    return response as unknown as UnfurlResponse
  }

  const metadata = await unfurl(url.href, {
    fetch: fetchWithSignal,
    oembed: false,
  })

  return metadata as LinkMetadata
}
