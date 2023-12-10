import type { APIRoute, GetStaticPaths } from "astro"
import { getPostEntries } from "../../../lib/posts"
import { getEntry } from "astro:content"

export const getStaticPaths: GetStaticPaths = async () => {
  return await getPostEntries()
}

export const GET: APIRoute = async ({ params }) => {
  if (!params.slug) {
    return NotFound()
  }

  const post = await getEntry("posts", params.slug)
  if (!post?.data) {
    return NotFound()
  }

  return new Response(JSON.stringify(post.data, null, 2))
}

const NotFound = () => new Response("Not found", { status: 404 })
