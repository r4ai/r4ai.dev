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
  isBackgroundDark?: boolean
}

export const ProjectCard = (props: ProjectCardProps) => {
  const isBackgroundDark = () => props.isBackgroundDark ?? true

  return (
    <div
      class={cn(
        "col-span-2 row-span-2 max-h-[400px] rounded-xl border",
        props.hasImage
          ? "relative"
          : cn(
              "flex flex-col items-center",
              isBackgroundDark() ? "bg-zinc-900" : "bg-white"
            ),
        props.class
      )}
    >
      <div
        class={cn(
          "flex w-full flex-row flex-wrap items-center justify-between gap-4 rounded-b-xl border-zinc-700 px-8 py-4 text-lg font-bold backdrop-blur-xl",
          !isBackgroundDark() && "border-zinc-300",
          props.hasImage
            ? "absolute bottom-0 rounded-b-xl border-t"
            : "h-full rounded-xl"
        )}
      >
        <div class="flex flex-col gap-2">
          <div>
            <h2
              class={cn(
                "mr-2 inline-block text-xl font-bold",
                isBackgroundDark() ? "text-white" : "text-black"
              )}
            >
              {props.title}
            </h2>
            <span
              class={cn(
                "inline-block text-sm",
                isBackgroundDark() ? "text-zinc-400" : "text-zinc-500"
              )}
            >
              {props.year}
            </span>
          </div>
          <p
            class={cn(
              "text-sm",
              isBackgroundDark() ? "text-zinc-400" : "text-zinc-600"
            )}
          >
            {props.description}
          </p>
        </div>
        <div class="ml-auto flex flex-row flex-wrap items-center justify-end gap-3">
          <For each={props.links}>
            {({ href, label }) => <LinkButton href={href}>{label}</LinkButton>}
          </For>
        </div>
      </div>
      {props.children}
    </div>
  )
}
