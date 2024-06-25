import {
  createAsync,
  type RouteDefinition,
  useSearchParams,
} from "@solidjs/router"
import { createEffect, createMemo, createSignal, For } from "solid-js"
import type { InferOutput } from "valibot"

import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "~/components/ui"

import { posts as postsCollection } from "./(content)/config"
import { PostCard } from "./components"
import { getPosts, sortPostsByPublishedAt } from "./libs"

type Params = {
  genre?: InferOutput<typeof postsCollection.schema>["genre"]
}

export const route: RouteDefinition = {
  load: () => getPosts(),
}

export default () => {
  const [searchPrams, setSearchParams] = useSearchParams<Params>()
  const posts = createAsync(() => getPosts())

  const techBlog = createMemo(() =>
    sortPostsByPublishedAt(
      posts()?.filter((post) => post.frontmatter.genre === "tech-blog"),
    ),
  )
  const slides = createMemo(() =>
    sortPostsByPublishedAt(
      posts()?.filter((post) => post.frontmatter.genre === "slide"),
    ),
  )

  const [genre, setGenre] = createSignal<NonNullable<Params["genre"]>>(
    searchPrams.genre ?? "tech-blog",
  )

  createEffect(() => {
    setSearchParams({ genre: genre() })
  })

  return (
    <>
      <main class="my-6 w-full container space-y-8">
        <h2 class="text-center text-4.5xl font-black font-times">Posts</h2>
        <Tabs onChange={setGenre} value={genre()}>
          <TabsList class="mx-auto w-fit">
            <TabsTrigger class="px-5 py-3 text-base" value="tech-blog">
              Tech Blog
            </TabsTrigger>
            <TabsTrigger class="px-5 py-3 text-base" value="slide">
              Slides
            </TabsTrigger>
            <TabsIndicator />
          </TabsList>
          <TabsContent value="tech-blog">
            <div
              class="grid mx-auto my-6 max-w-screen-lg place-content-center place-items-center gap-6"
              style={{
                "grid-template-columns":
                  "repeat(auto-fill, minmax(256px, 1fr))",
              }}
            >
              <For each={techBlog()}>{(post) => <PostCard post={post} />}</For>
            </div>
          </TabsContent>
          <TabsContent value="slide">
            <div
              class="grid mx-auto my-6 max-w-screen-lg place-content-center place-items-center gap-6"
              style={{
                "grid-template-columns":
                  "repeat(auto-fill, minmax(256px, 1fr))",
              }}
            >
              <For each={slides()}>{(post) => <PostCard post={post} />}</For>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}
