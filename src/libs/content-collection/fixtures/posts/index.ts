import { array, date, object, string } from "valibot"

import { defineCollection } from "../../content-collection"

export const posts = defineCollection({
  basePath: "posts",
  schema: object({
    title: string(),
    date: date(),
    tags: array(string()),
  }),
  dirname: import.meta.dirname,
})
