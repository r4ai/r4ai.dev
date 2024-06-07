import type { SimpleIcon as SimpleIconJson } from "simple-icons"
import { type Component, type ComponentProps, splitProps } from "solid-js"

import { cn } from "~/libs/utils"

export type SimpleIconProps = ComponentProps<"div"> & {
  icon: SimpleIconJson
}

export const SimpleIcon: Component<SimpleIconProps> = (props) => {
  const [local, rest] = splitProps(props, ["icon", "class"])

  return (
    <div class={cn("*:w-full", local.class)} {...rest}>
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentcolor"
      >
        <title>{local.icon.title}</title>
        <path d={local.icon.path} />
      </svg>
    </div>
  )
}
