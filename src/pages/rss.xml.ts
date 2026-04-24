import rss from "@astrojs/rss"
import type { APIContext } from "astro"
import { getCollection } from "astro:content"

export async function GET(context: APIContext) {
  const posts = await getCollection("posts", ({ data }) =>
    import.meta.env.DEV ? !data.internal : !data.draft && !data.internal
  )

  return rss({
    title: "r4ai.dev",
    description: "r4ai's blog",
    site: context.site!,
    items: posts
      .filter((post) => post.data.genre === "article")
      .sort(
        (a, b) =>
          new Date(b.data.publishedAt).getTime() -
          new Date(a.data.publishedAt).getTime()
      )
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.publishedAt,
        link: `/posts/${post.slug}/`,
      })),
    customData: `<language>ja</language>`,
  })
}
