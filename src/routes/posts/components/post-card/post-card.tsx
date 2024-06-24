import { A } from "@solidjs/router"
import { type Component, For } from "solid-js"

import type { Post } from "~/routes/posts/libs"

export type PostCardProps = {
  post: Post
}

export const PostCard: Component<PostCardProps> = (props) => {
  return (
    <A
      href={props.post.route}
      class="flex flex-row gap-4 rounded-xl p-4 transition hover:bg-muted"
    >
      <div>
        <span class="text-size-3xl">{props.post.frontmatter.icon}</span>
      </div>
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
    </A>
  )
}
