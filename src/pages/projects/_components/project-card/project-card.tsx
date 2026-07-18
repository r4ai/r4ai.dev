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
  isImageBackgroundDark?: boolean
}

export const ProjectCard = (props: ProjectCardProps) => {
  const isImageBackgroundDark = () => props.isImageBackgroundDark ?? true

  return (
    <div
      class={cn(
        "col-span-2 row-span-2 max-h-[400px] rounded-xl border",
        props.hasImage ? "relative" : "flex flex-col items-center bg-card",
        props.class
      )}
    >
      <div
        class={cn(
          "flex w-full flex-row flex-wrap items-center justify-between gap-4 rounded-b-xl px-8 py-4 text-lg font-bold backdrop-blur-xl",
          props.hasImage &&
            (isImageBackgroundDark() ? "border-zinc-700" : "border-zinc-300"),
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
                props.hasImage
                  ? isImageBackgroundDark()
                    ? "text-white"
                    : "text-black"
                  : "text-card-foreground"
              )}
            >
              {props.title}
            </h2>
            <span
              class={cn(
                "inline-block text-sm",
                props.hasImage
                  ? isImageBackgroundDark()
                    ? "text-zinc-400"
                    : "text-zinc-500"
                  : "text-muted-foreground"
              )}
            >
              {props.year}
            </span>
          </div>
          <p
            class={cn(
              "text-sm",
              props.hasImage
                ? isImageBackgroundDark()
                  ? "text-zinc-400"
                  : "text-zinc-600"
                : "text-muted-foreground"
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
