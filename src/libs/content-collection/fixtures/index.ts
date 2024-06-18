import { defineCollection } from "../content-collection"

export const posts = defineCollection({
  name: "posts",
  dirname: import.meta.dirname,
})
