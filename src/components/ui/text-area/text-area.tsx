import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import * as TextFieldPrimitive from "@kobalte/core/text-field"
import type { JSX, ValidComponent, VoidProps } from "solid-js"
import { splitProps } from "solid-js"
import type { Merge } from "ts-essentials"

import { cn } from "@/lib/utils"

export type TextAreaProps = VoidProps<
  Merge<
    Omit<TextFieldPrimitive.TextFieldTextAreaProps, "ref">,
    {
      onInput: JSX.EventHandler<HTMLTextAreaElement, InputEvent>
      class?: string
      ref?: HTMLTextAreaElement | ((el: HTMLTextAreaElement) => void)
    }
  >
>

export const TextArea = <T extends ValidComponent = "textarea">(
  props: PolymorphicProps<T, TextAreaProps>
) => {
  const [local, rest] = splitProps(props as TextAreaProps, ["class"])

  return (
    <TextFieldPrimitive.TextArea
      class={cn(
        "focus-visible:ring-1.5 flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-shadow placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        local.class
      )}
      style={{
        "field-sizing": "content",
      }}
      {...rest}
    />
  )
}
