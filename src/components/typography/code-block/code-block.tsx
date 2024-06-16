import "~/styles/shiki.css"

import { ClipboardCheckIcon, ClipboardIcon } from "lucide-solid"
import {
  type Component,
  type ComponentProps,
  createSignal,
  splitProps,
} from "solid-js"

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  type TooltipTriggerProps,
} from "~/components/ui"
import { cn } from "~/libs/utils"

export type CodeBlockProps = ComponentProps<"pre">

export const CodeBlock: Component<CodeBlockProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "ref"])
  let preRef: HTMLPreElement | undefined

  return (
    <div class="relative mx-auto max-w-screen-md rounded-xl border bg-muted bg-zinc-50 dark:bg-zinc-900/75">
      <div>{/* title */}</div>
      <pre
        class={cn("peer m-0 overflow-auto py-4", local.class)}
        ref={(el) => {
          preRef = el
          if (typeof local.ref === "function") local.ref(el)
          else local.ref = el
        }}
        {...rest}
      />
      <CopyButton preRef={preRef} />
    </div>
  )
}

type CopyButtonProps = {
  class?: string
  preRef: HTMLPreElement | undefined
}

const CopyButton: Component<CopyButtonProps> = (props) => {
  const [copied, setCopied] = createSignal(false)
  return (
    <Tooltip openDelay={200} closeDelay={copied() ? 300 : 100}>
      <TooltipTrigger
        onClick={(e) => e.preventDefault()}
        as={(tooltipProps: TooltipTriggerProps) => (
          <Button
            {...tooltipProps}
            class={cn(
              "absolute right-2 top-2 z-20 text-zinc-400 hover:text-black dark:text-zinc-600 dark:hover:text-zinc-300",
              "opacity-0 hover:opacity-100 peer-hover:opacity-100",
              props.class,
            )}
            size="icon"
            variant="ghost"
            onClick={() => {
              if (!props.preRef) return
              navigator.clipboard.writeText(props.preRef.textContent ?? "")
              setCopied(true)
              setTimeout(() => setCopied(false), 10 * 1000)
            }}
          >
            {copied() ? (
              <ClipboardCheckIcon class="size-5" />
            ) : (
              <ClipboardIcon class="size-5" />
            )}
          </Button>
        )}
      />
      <TooltipContent>
        <p class="font-semibold">
          {copied() ? "Copied!" : "Copy to clipboard"}
        </p>
      </TooltipContent>
    </Tooltip>
  )
}
