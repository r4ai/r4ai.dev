import { A } from "@solidjs/router"
import { type Component, For } from "solid-js"
import { Dynamic } from "solid-js/web"

import { cn } from "~/libs/utils"
import type { Post } from "~/routes/posts/libs"

export type PostCardProps = {
  post: Post
  a?: Component
}

export const PostCard: Component<PostCardProps> = (props) => {
  return (
    <Dynamic
      component={props.a ?? A}
      href={props.post.route}
      class="flex flex-row items-center gap-5 rounded-xl p-4 transition hover:bg-muted"
    >
      <div class={cn("size-12", props.post.frontmatter.icon)} />
      <div>
        <h3 class="text-lg font-bold">{props.post.frontmatter.title}</h3>
        <div class="flex flex-row gap-2 text-sm text-muted-foreground">
          {
            <For each={props.post.frontmatter.tags}>
              {(tag) => <span class="before:content-['#']">{tag}</span>}
            </For>
          }
        </div>
        <div class="text-sm text-muted-foreground">
          <span>
            {new Date(props.post.frontmatter.publishedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Dynamic>
  )
}
