import { type Component, splitProps } from "solid-js"

import { Button, type ButtonProps } from "~/components/ui"
import { cn } from "~/libs/utils"

export type SubmitButtonProps = ButtonProps & {
  submitting?: boolean
}

export const SubmitButton: Component<SubmitButtonProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "disabled", "submitting"])
  return (
    <Button
      disabled={local.disabled ?? local.submitting}
      class={cn("w-full", local.class)}
      type="submit"
      {...rest}
    >
      {props.submitting ? (
        <>
          <span class="i-lucide-circle size-4 animate-spin" />
          <span class="ml-2">送信中</span>
        </>
      ) : (
        "送信"
      )}
    </Button>
  )
}
