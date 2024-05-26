import { type Component, type ComponentProps, splitProps } from "solid-js"

import { cn } from "~/libs/utils"

export type FooterProps = Omit<ComponentProps<"footer">, "children">

export const Footer: Component<FooterProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <footer
      class={cn(local.class, "flex w-full flex-col items-center py-4")}
      {...rest}
    >
      <p class="text-sm">Copyright &copy; 2024 r4ai - All rights reserved</p>
    </footer>
  )
}
