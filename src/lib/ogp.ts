import { parseHTML } from "linkedom"

export const getOGP = async (url: URL) => {
  const res = await fetch(url.href)
  const data = await res.text()
  const { document } = parseHTML(data)
  const head = document.head
  const body = document.body
  const title =
    head.querySelector("title")?.textContent ??
    head.querySelector("meta[property='og:title']")?.getAttribute("content") ??
    body.querySelector("h1")?.textContent
  const description = getDescription(url, head)
  const image = getImage(url, head)
  return { title, description, image }
}

const getDescription = (url: URL, head: HTMLElement) => {
  const defaultDescription = () =>
    head.querySelector("meta[name='description']")?.getAttribute("content") ??
    head
      .querySelector("meta[property='og:description']")
      ?.getAttribute("content") ??
    undefined

  switch (url.hostname) {
    case "zenn.dev":
      return (
        head
          .querySelector("meta[name='zenn:description']")
          ?.getAttribute("content") ?? defaultDescription()
      )
    default:
      return defaultDescription()
  }
}

const getImage = (url: URL, head: HTMLElement) => {
  const defaultImage = () =>
    head.querySelector("meta[property='og:image']")?.getAttribute("content") ??
    undefined

  switch (url.hostname) {
    case "zenn.dev":
      return (
        head
          .querySelector("meta[name='zenn:image']")
          ?.getAttribute("content") ?? defaultImage()
      )
    default:
      return defaultImage()
  }
}

export const getFavicon = async (url: URL) => {
  const domain = url.hostname
  const response = await fetch(`https://icons.duckduckgo.com/ip3/${domain}.ico`)
  const arrayBuffer = await response.arrayBuffer()
  const base64 = Buffer.from(arrayBuffer).toString("base64")
  return `data:${response.headers.get("content-type")};base64,${base64}`
}
