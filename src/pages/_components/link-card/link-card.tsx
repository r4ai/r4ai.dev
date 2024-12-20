import type { Component, JSX } from "solid-js"

import { cn } from "@/lib/utils"

export type LinkCardProps = {
  href: string
  icon: JSX.Element | Component
  title: string
  site: string
  class?: string
}

export const LinkCard: Component<LinkCardProps> = (props) => {
  return (
    <a href={props.href} aria-label={props.title} class="inline-block">
      <div
        class={cn(
          "flex flex-row gap-3 rounded-md border px-3 py-3 shadow-sm transition-colors hover:bg-zinc-50 hover:underline dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-200",
          props.class
        )}
      >
        {typeof props.icon === "function" ? <props.icon /> : props.icon}
        <p class={"text-sm after:content-['↗']"}>
          {props.site + " " + props.title}
        </p>
      </div>
    </a>
  )
}
