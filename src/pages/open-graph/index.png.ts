import type { APIRoute } from "astro"
import sharp from "sharp"

import { OpenGraphImage, render } from "./_components"

export const GET: APIRoute = async () => {
  const image = await render(sharp, OpenGraphImage, {})
  return new Response(image, {
    headers: { "Content-Type": "image/png" },
  })
}
