import { unfurl } from "unfurl.js"

import type { LinkMetadataLoader } from "./transformer.ts"

const requestHeaders = {
  Accept: "text/html, application/xhtml+xml",
  "User-Agent": "facebookexternalhit",
}

export const loadLinkMetadata: LinkMetadataLoader = async (url, signal) => {
  return unfurl(url.href, {
    fetch: (input) =>
      fetch(input, {
        headers: requestHeaders,
        redirect: "follow",
        signal,
      }),
    oembed: false,
  })
}
