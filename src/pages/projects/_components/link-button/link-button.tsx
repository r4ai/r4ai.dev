import type { JSXElement } from "solid-js"

import IconExternalLink from "~icons/lucide/external-link"

export type LinkButtonProps = {
  href: string
  children?: JSXElement
}

export const LinkButton = (props: LinkButtonProps) => {
  return (
    <a
      href={props.href}
      class="flex flex-row items-center gap-1.5 rounded-full border bg-secondary/80 px-4 py-2 text-sm transition hover:bg-secondary"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span class="inline-block">{props.children}</span>
      <IconExternalLink class="size-4" />
    </a>
  )
}
