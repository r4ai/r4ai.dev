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
      class="grid grid-row-span-3 grid-row-start-0 grid-rows-subgrid w-full gap-4 rounded-2xl p-6 transition hover:bg-muted focus-visible:(outline-none ring-2 ring-ring) dark:hover-bg-muted/60"
    >
      <div class="mx-auto flex flex-col items-center gap-2">
        <span class={cn("size-20 block m-4", props.post.frontmatter.icon)} />
        <h3 class="text-2xl font-extrabold">{props.post.frontmatter.title}</h3>
      </div>
      <div class="text-center text-muted-foreground font-mono">
        {getRelativeTime(new Date(props.post.frontmatter.publishedAt))}
      </div>
      <div class="text-center text-sm text-muted-foreground font-mono">
        {
          <For each={props.post.frontmatter.tags}>
            {(tag) => (
              <span class="mx-1 my-0.5 inline-block before:content-['#']">
                {tag}
              </span>
            )}
          </For>
        }
      </div>
    </Dynamic>
  )
}

/**
 * Get the relative time from a given date
 */
const getRelativeTime = (date: Date) => {
  const deltaSeconds = Math.round((date.getTime() - Date.now()) / 1000)

  const units = {
    second: 1,
    minute: 60,
    hour: 60 * 60,
    day: 60 * 60 * 24,
    week: 60 * 60 * 24 * 7,
    month: 60 * 60 * 24 * 30,
    year: 60 * 60 * 24 * 365,
  } as const

  const [unitLabel, unit] = Object.entries(units).find(
    ([, cutoff]) => Math.abs(deltaSeconds) < cutoff,
  ) ?? ["year", units.year]

  const relativeTime = Math.round(deltaSeconds / unit)
  return `${relativeTime > 1 ? relativeTime : "a"} ${unitLabel}${relativeTime > 1 ? "s" : ""} ago`
}
