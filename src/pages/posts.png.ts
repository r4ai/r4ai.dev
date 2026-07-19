import type { APIRoute } from "astro"
import sharp from "sharp"

import { OpenGraphImage, render } from "@/components/open-graph-images"

export const GET: APIRoute = async () => {
  const image = await render(sharp, OpenGraphImage, {
    title: "Posts",
  })
  return new Response(image, {
    headers: { "Content-Type": "image/png" },
  })
}
