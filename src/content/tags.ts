import { z } from "zod"

const tagSchema = z.object({
  name: z.string(),
  twColor: z.string(),
})

type Tag = z.infer<typeof tagSchema>

export const tagsSchema = z.array(z.string())

export const tags = [
  {
    name: "astro",
    twColor: "text-purple-500",
  },
  {
    name: "svelte",
    twColor: "text-orange-600",
  },
  {
    name: "react",
    twColor: "text-indigo-600",
  },
  {
    name: "slide",
    twColor: "text-yellow-500",
  },
] as const satisfies readonly Tag[]
