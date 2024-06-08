import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import * as TextFieldPrimitive from "@kobalte/core/text-field"
import type { ValidComponent, VoidProps } from "solid-js"
import { splitProps } from "solid-js"

import { cn } from "~/libs/utils"

export type TextAreaProps = VoidProps<
  Omit<TextFieldPrimitive.TextFieldTextAreaProps, "ref"> & {
    class?: string
    ref?: HTMLTextAreaElement | ((el: HTMLTextAreaElement) => void)
  }
>

export const TextArea = <T extends ValidComponent = "textarea">(
  props: PolymorphicProps<T, TextAreaProps>,
) => {
  const [local, rest] = splitProps(props as TextAreaProps, ["class"])

  return (
    <TextFieldPrimitive.TextArea
      class={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-shadow placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        local.class,
      )}
      style={{
        // @ts-expect-error `field-sizing` is valid CSS property
        "field-sizing": "content",
      }}
      {...rest}
    />
  )
}
