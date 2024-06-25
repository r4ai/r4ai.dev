import { cache } from "@solidjs/router"
import { read } from "to-vfile"
import type { InferOutput } from "valibot"
import { matter } from "vfile-matter"

import { fileToRoute, getFiles } from "~/libs/content-collection"
import { posts as postsCollection } from "~/routes/posts/(content)/config"

export type Post = {
  route: string
  frontmatter: Omit<
    InferOutput<typeof postsCollection.schema>,
    "publishedAt" | "updatedAt"
  > & {
    publishedAt: string
    updatedAt?: string
  }
}

export const getFrontmatter = async (filePath: string) => {
  "use server"
  const file = await read(filePath)
  matter(file)
  return file.data.matter as Post["frontmatter"]
}

export const getPosts = cache(async () => {
  "use server"
  const postsDir = postsCollection.dirname
  const postFiles = await getFiles(postsDir)
  const posts = await Promise.all(
    postFiles.map(async (filePath) => {
      const post: Post = {
        route: fileToRoute(filePath, postsDir, "posts"),
        frontmatter: await getFrontmatter(filePath),
      }
      return post
    }),
  )
  return posts
}, "posts")

export const sortPostsByPublishedAt = (posts?: Post[]) =>
  posts?.sort(
    (a, b) =>
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime(),
  )
