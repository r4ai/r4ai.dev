import type { APIRoute } from "astro"
import { getEntry } from "astro:content"

import { OGImage, render } from "./_components"

export { getStaticPaths } from "./index.astro"

export const GET: APIRoute = async ({ params }) => {
  if (!params.slug) {
    return NotFound()
  }

  const post = await getEntry("posts", params.slug)
  if (!post?.data) {
    return NotFound()
  }

  const image = await render(OGImage, { title: post.data.title })
  return new Response(image, {
    headers: { "Content-Type": "image/png" },
  })
}

const NotFound = () => new Response("Not found", { status: 404 })
