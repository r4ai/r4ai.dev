import type { APIRoute } from "astro"
import { getEntry } from "astro:content"
import sharp from "sharp"

import { OpenGraphImage, render } from "@/components/open-graph-images"

export { getStaticPaths } from "./index.astro"

export const GET: APIRoute = async ({ params }) => {
  if (!params.slug) {
    return NotFound()
  }

  const post = await getEntry("posts", params.slug)
  if (!post?.data) {
    return NotFound()
  }

  const image = await render(sharp, OpenGraphImage, {
    title: post.data.title,
  })
  return new Response(image, {
    headers: { "Content-Type": "image/png" },
  })
}

const NotFound = () => new Response("Not found", { status: 404 })
