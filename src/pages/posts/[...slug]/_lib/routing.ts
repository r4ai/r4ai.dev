import type { GetStaticPaths } from "astro"
import { getCollection } from "astro:content"

export const getStaticPaths = (async () => {
  const posts = await getCollection("posts", ({ data }) =>
    import.meta.env.DEV ? true : !data.draft
  )
  return posts.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }))
}) satisfies GetStaticPaths
