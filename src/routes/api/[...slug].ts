"use server"

import * as fs from "node:fs/promises"

import type { APIHandler } from "@solidjs/start/server"
import { Hono } from "hono"

import { fileToRoute, getFiles } from "~/libs/content-collection/utils"
import { posts } from "~/routes/posts/(content)/config"

const app = new Hono().basePath("/api")

const postsApi = new Hono()
const postFiles = await getFiles(posts.dirname)
for (const file of postFiles) {
  const route = fileToRoute(file, posts.dirname)

  // Raw MDX file
  postsApi.get(`${route}.mdx`, async () => {
    const code = await fs.readFile(file, "utf-8")
    return new Response(code, {
      headers: {
        "Content-Type": "text/mdx; charset=utf-8",
      },
    })
  })

  // OG Image
  postsApi.get(`${route}.png`, async (c) => {
    return c.text("Not implemented", { status: 501 })
  })
}
app.route("/posts", postsApi)

const createHandler = (): APIHandler => async (event) => {
  return await app.fetch(event.request, {
    h3Event: event.nativeEvent,
  })
}

export const GET = createHandler()
export const POST = createHandler()
export const PUT = createHandler()
export const DELETE = createHandler()
export const PATCH = createHandler()
export const OPTIONS = createHandler()
