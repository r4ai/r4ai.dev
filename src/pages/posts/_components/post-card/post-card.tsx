import { format } from "@formkit/tempo"
import { type Component, For } from "solid-js"

import { cn } from "@/lib/utils"

export type PostCardProps = {
  title: string
  tags: string[]
  href: string
  icon: string
  alt: string
  publishedAt: Date
  shouldInvert?: boolean
}

export const PostCard: Component<PostCardProps> = (props) => {
  return (
    <a
      href={props.href}
      class="flex flex-row gap-4 rounded-xl border p-4 font-mono transition hover:bg-muted dark:hover:bg-muted/60"
    >
      <div class="">
        <svg
          class="size-12"
          viewBox="0 0 32 32"
          // eslint-disable-next-line solid/no-innerhtml
          innerHTML={props.icon}
        />
      </div>
      <div class="flex grow flex-col gap-1">
        <h3
          class="text-lg font-semibold"
          // eslint-disable-next-line solid/no-innerhtml
          innerHTML={props.title}
        />
        <ul>
          <For each={props.tags}>
            {(tag, index) => (
              <li
                class={cn(
                  "inline-block text-sm text-muted-foreground before:content-['#']",
                  index() < props.tags.length - 1 && "mr-2"
                )}
              >
                {tag}
              </li>
            )}
          </For>
        </ul>
        <div class="ml-auto mt-auto pt-1 text-sm text-muted-foreground">
          {format(props.publishedAt, "long")}
        </div>
      </div>
    </a>
  )
}
