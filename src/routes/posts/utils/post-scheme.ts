import * as v from "valibot"

export const postSchema = v.object({
  title: v.string("Please provide a post title. Example: `title: Hello World`"),
  genre: v.picklist(
    ["article", "slide"],
    "Please provide a post genre. Example: `genre: article`",
  ),
  icon: v.string("Please provide a post icon. Example: `icon: 📝`"),
  draft: v.boolean(
    "Please provide a post draft status. If it's a draft, set it to `true`. Example: `draft: true`",
  ),
  publishedAt: v.date(
    "Please provide a post published date. Example: `publishedAt: 2024-01-01`",
  ),
  updatedAt: v.optional(
    v.date(
      "Please provide a valid post updated date. Example: `updatedAt: 2024-01-01`",
    ),
  ),
  tags: v.optional(
    v.array(
      v.string(
        "Please provide a valid post tag. Example: `tags: [tag1, tag2]`",
      ),
    ),
  ),
})

export type PostSchema = v.InferOutput<typeof postSchema>
