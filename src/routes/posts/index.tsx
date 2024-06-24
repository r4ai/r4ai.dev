import { createAsync, type RouteDefinition } from "@solidjs/router"
import { For } from "solid-js"

import { PostCard } from "./components"
import { getPosts, sortPostsByPublishedAt } from "./libs"

export const route: RouteDefinition = {
  load: () => getPosts(),
}

export default () => {
  const posts = createAsync(() => getPosts().then(sortPostsByPublishedAt))
  return (
    <>
      <h1>Posts</h1>
      <p>this page is currently under construction. please check back later.</p>
      <div class="mx-auto">
        <For each={posts()}>{(post) => <PostCard post={post} />}</For>
      </div>
    </>
  )
}
