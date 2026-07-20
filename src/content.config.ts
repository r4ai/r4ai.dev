import { glob } from "astro/loaders"
import { z } from "astro/zod"
import { defineCollection } from "astro:content"

const postCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    genre: z.enum(["article", "slide"]),
    category: z.enum(["tech", "hobby"]).optional(),
    icon: z.string(),
    draft: z.boolean(),
    internal: z.boolean().default(false),
    publishedAt: z.date(),
    tags: z.array(z.string()).optional(),
    ogImage: z.string().optional(),
    updatedAt: z.date().optional(),
    link: z.string().optional(),
  }),
})

export const collections = {
  posts: postCollection,
}
