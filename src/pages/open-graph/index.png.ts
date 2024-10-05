import type { APIRoute } from "astro"

import { OpenGraphImage, render } from "./_components"

export const GET: APIRoute = async () => {
  const image = await render(OpenGraphImage, {})
  return new Response(image, {
    headers: { "Content-Type": "image/png" },
  })
}
