import { type Component, type ComponentProps, For, splitProps } from "solid-js"

import { cn } from "@/lib/utils"

export type TagsProps = ComponentProps<"div"> & {
  tags: string[]
}

export const Tags: Component<TagsProps> = (props) => {
  const [local, rest] = splitProps(props, ["tags", "class"])

  return (
    <div
      {...rest}
      class={cn(
        "mx-auto flex max-w-screen-sm flex-row flex-wrap items-center justify-center gap-2 text-muted-foreground",
        local.class
      )}
    >
      <For each={local.tags}>
        {(tag) => (
          <span class="inline-block rounded-md border px-2 py-1 font-mono text-sm before:content-['#']">
            {tag}
          </span>
        )}
      </For>
    </div>
  )
}
