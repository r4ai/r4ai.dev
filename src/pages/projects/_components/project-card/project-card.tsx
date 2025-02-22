import type { JSXElement } from "solid-js"
import { For } from "solid-js"

import { cn } from "@/lib/utils"

import { LinkButton } from "../link-button"
export type ProjectCardProps = {
  class?: string
  title: string
  description: string
  year: string
  hasImage: boolean
  children?: JSXElement
  links: { label: string; href: string }[]
  theme?: "light" | "dark"
}

export const ProjectCard = (props: ProjectCardProps) => {
  return (
    <div
      class={cn(
        "col-span-2 row-span-2 rounded-xl border",
        props.hasImage ? "relative" : "flex flex-col items-center",
        props.class
      )}
    >
      <div
        class={cn(
          "flex w-full flex-row items-center justify-between gap-8 rounded-b-xl border-zinc-700 px-8 py-4 text-lg font-bold backdrop-blur-xl",
          props.theme === "light" && "border-zinc-300",
          props.hasImage
            ? "absolute bottom-0 rounded-b-xl border-t"
            : "h-full rounded-xl"
        )}
      >
        <div class="flex flex-col gap-2">
          <div>
            <h2
              class={cn(
                "mr-2 inline-block text-xl font-bold text-white",
                props.theme === "light" && "text-black"
              )}
            >
              {props.title}
            </h2>
            <span
              class={cn(
                "inline-block text-sm text-zinc-400",
                props.theme === "light" && "text-zinc-500"
              )}
            >
              {props.year}
            </span>
          </div>
          <p
            class={cn(
              "text-sm text-zinc-400",
              props.theme === "light" && "text-zinc-600"
            )}
          >
            {props.description}
          </p>
        </div>
        <div class="flex flex-row flex-wrap items-center justify-end gap-3">
          <For each={props.links}>
            {({ href, label }) => <LinkButton href={href}>{label}</LinkButton>}
          </For>
        </div>
      </div>
      {props.children}
    </div>
  )
}
