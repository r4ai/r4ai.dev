import { defineCollection, z } from "astro:content"

const postCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    genre: z.enum(["article", "slide"]),
    icon: z.string(),
    draft: z.boolean(),
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
