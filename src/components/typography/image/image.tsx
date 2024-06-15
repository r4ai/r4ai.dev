import { type Component, type ComponentProps, splitProps } from "solid-js"

import { cn } from "~/libs/utils"

export type ImageProps = ComponentProps<"img">

export const Image: Component<ImageProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "class",
    "title",
    "decoding",
    "loading",
  ])
  return (
    <figure class="space-y-2">
      <img
        class={cn("rounded-lg", local.class)}
        decoding={local.decoding ?? "async"}
        loading={local.loading ?? "lazy"}
        {...rest}
      />
      {local.title && (
        <figcaption class="mx-auto w-fit italic text-muted-foreground">
          {local.title}
        </figcaption>
      )}
    </figure>
  )
}
