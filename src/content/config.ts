import { z, defineCollection } from "astro:content";
import { tagsSchema } from "./tags";

export const postSchema = z
  .object({
    title: z.string(),
    genre: z.enum(["article", "slide"]),
    icon: z.string(),
    draft: z.boolean(),
    publishedAt: z.date(),
    tags: tagsSchema.optional(),
    ogImage: z.string().optional(),
    updatedAt: z.date().optional(),
    link: z.string().optional(),
  })
  .strict();

const postCollection = defineCollection({
  type: "content",
  schema: postSchema,
});

export const collections = {
  posts: postCollection,
};
