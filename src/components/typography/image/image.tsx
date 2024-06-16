import {
  type Component,
  type ComponentProps,
  createMemo,
  type JSX,
  splitProps,
} from "solid-js"
import { Dynamic } from "solid-js/web"

import { cn } from "~/libs/utils"

export type ImageProps = Omit<ComponentProps<"img">, "title"> & {
  title?: JSX.Element
}

export const Image: Component<ImageProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "class",
    "title",
    "decoding",
    "loading",
    "children",
  ])
  const title = createMemo(() => local.title ?? local.children)
  return (
    <Dynamic component={title() ? "figure" : "div"} class="space-y-2">
      <img
        class={cn("mx-auto w-full max-w-screen-lg rounded-lg", local.class)}
        decoding={local.decoding ?? "async"}
        loading={local.loading ?? "lazy"}
        {...rest}
      />
      {title() && (
        <figcaption class="mx-auto w-fit italic text-muted-foreground">
          {title()}
        </figcaption>
      )}
    </Dynamic>
  )
}
