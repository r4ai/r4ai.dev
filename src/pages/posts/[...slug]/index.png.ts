import fs from "node:fs/promises"

import type { APIRoute } from "astro"
import { getEntry } from "astro:content"
import sharp from "sharp"

import { OpenGraphImage, render } from "./_components"

export { getStaticPaths } from "./index.astro"

const titleFont = await fs.readFile(
  "src/assets/fonts/noto-sans-jp/static/NotoSansJP-Bold.ttf"
)
const bgAccentImage = await fs.readFile("src/assets/imgs/og/stripe.png")
const bgImage = await fs.readFile("src/assets/imgs/og/bg.png")

export const GET: APIRoute = async ({ params }) => {
  if (!params.slug) {
    return NotFound()
  }

  const post = await getEntry("posts", params.slug)
  if (!post?.data) {
    return NotFound()
  }

  const image = await render(
    sharp,
    OpenGraphImage,
    { title: post.data.title, bgAccentImage, bgImage },
    { NotoSansJP: titleFont }
  )
  return new Response(image, {
    headers: { "Content-Type": "image/png" },
  })
}

const NotFound = () => new Response("Not found", { status: 404 })
