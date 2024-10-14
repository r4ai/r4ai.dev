import type { APIRoute } from "astro"
import { getEntry } from "astro:content"

export { getStaticPaths } from "./index.astro"

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params
  if (!slug) return NotFound()

  const post = await getEntry("posts", slug)
  if (!post?.data) return NotFound()

  return new Response(post.body, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
    status: 200,
    statusText: "OK",
  })
}

const NotFound = () => new Response("Not Found", { status: 404 })
