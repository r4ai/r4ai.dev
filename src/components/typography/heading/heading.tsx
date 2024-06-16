import { type ComponentProps, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import { tv } from "tailwind-variants"

type HeadingLevel = "h1" | "h2" | "h3" | "h4"

export type HeadingProps<Level extends HeadingLevel> = ComponentProps<Level> & {
  level: Level
}

export const Heading = <Level extends HeadingLevel>(
  props: HeadingProps<Level>,
) => {
  const [local, rest] = splitProps(props as HeadingProps<HeadingLevel>, [
    "level",
    "class",
  ])
  return (
    <Dynamic
      component={local.level}
      class={heading({
        level: local.level,
        class: local.class,
      })}
      {...rest}
    />
  )
}

const heading = tv({
  base: "mx-auto max-w-screen-md scroll-m-20 tracking-tight",
  variants: {
    level: {
      h1: "text-4xl font-extrabold lg:text-5xl",
      h2: "border-b pb-2 text-3xl font-semibold group-data-[heading-level]:mt-10",
      h3: "text-2xl font-semibold group-data-[heading-level]:mt-8",
      h4: "text-xl font-semibold group-data-[heading-level]:mt-8",
    },
  },
})
