import { type Component, type ComponentProps, splitProps } from "solid-js"

import { cn } from "@/lib/utils"
import IconExternalLink from "~icons/lucide/external-link"

export type MdxFileLinkProps = ComponentProps<"div"> & {
  slug: string
}

export const MdxFileLink: Component<MdxFileLinkProps> = (props) => {
  const [local, rest] = splitProps(props, ["slug", "class"])

  return (
    <div
      {...rest}
      class={cn(
        "mx-auto flex flex-row gap-1 text-muted-foreground transition hover:text-foreground",
        local.class
      )}
    >
      <a
        class="underline hover:cursor-pointer"
        href={`/posts/${local.slug}.mdx`}
      >
        MDXファイル
        <IconExternalLink class="inline-block" />
      </a>
    </div>
  )
}
