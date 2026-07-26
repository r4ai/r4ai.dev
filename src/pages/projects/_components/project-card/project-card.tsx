import type { JSXElement } from "solid-js"
import { For } from "solid-js"
import { tv } from "tailwind-variants"

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

type ProjectCardAppearance = "plain" | "dark-image" | "light-image"

const projectCard = tv({
  slots: {
    root: "col-span-2 row-span-2 max-h-[400px] rounded-xl border",
    panel:
      "flex w-full flex-row flex-wrap items-center justify-between gap-4 rounded-b-xl px-8 py-4 text-lg font-bold backdrop-blur-xl",
    title: "mr-2 inline-block text-xl font-bold",
    metadata: "inline-block text-sm",
    description: "text-sm",
  },
  variants: {
    appearance: {
      plain: {
        root: "bg-card flex flex-col items-center",
        panel: "h-full rounded-xl",
        title: "text-card-foreground",
        metadata: "text-muted-foreground",
        description: "text-muted-foreground",
      },
      "dark-image": {
        root: "relative",
        panel: "absolute bottom-0 rounded-b-xl border-t border-zinc-700",
        title: "text-white",
        metadata: "text-zinc-400",
        description: "text-zinc-400",
      },
      "light-image": {
        root: "relative",
        panel: "absolute bottom-0 rounded-b-xl border-t border-zinc-300",
        title: "text-black",
        metadata: "text-zinc-500",
        description: "text-zinc-600",
      },
    },
  },
})

// hasImage  isImageBackgroundDark  appearance
// false     -                      plain
// true      false                  light-image
// true      true | undefined       dark-image
const getAppearance = (
  hasImage: boolean,
  isImageBackgroundDark: boolean | undefined
): ProjectCardAppearance => {
  if (!hasImage) return "plain"
  return (isImageBackgroundDark ?? true) ? "dark-image" : "light-image"
}

export const ProjectCard = (props: ProjectCardProps) => {
  const styles = () =>
    projectCard({
      appearance: getAppearance(props.hasImage, props.isImageBackgroundDark),
    })

  return (
    <div class={styles().root({ class: props.class })}>
      <div class={styles().panel()}>
        <div class="flex flex-col gap-2">
          <div>
            <h2 class={styles().title()}>{props.title}</h2>
            <span class={styles().metadata()}>{props.year}</span>
          </div>
          <p class={styles().description()}>{props.description}</p>
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
