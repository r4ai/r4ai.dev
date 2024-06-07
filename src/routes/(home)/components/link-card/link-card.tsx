import type { SimpleIcon as SimpleIconJson } from "simple-icons"
import type { Component } from "solid-js"

import { SimpleIcon } from "~/components/ui/simple-icon"
import { cn } from "~/libs/utils"

export type LinkCardProps = {
  href: string
  icon: SimpleIconJson
  title: string
  site: string
  class?: string
}

export const LinkCard: Component<LinkCardProps> = (props) => {
  return (
    <a href={props.href} aria-label={props.title} class="inline-block">
      <div
        class={cn(
          "flex flex-row gap-3 rounded-md border px-3 py-3 shadow-sm transition-colors hover:bg-neutral-50 hover:underline dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-neutral-200",
          props.class,
        )}
      >
        <SimpleIcon icon={props.icon} class="size-5" />
        <p class={"text-sm after:content-['↗']"}>
          {props.site + " " + props.title}
        </p>
      </div>
    </a>
  )
}
