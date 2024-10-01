import "@/styles/shiki.css"

import {
  type Component,
  type ComponentProps,
  createSignal,
  type JSX,
  splitProps,
} from "solid-js"

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  type TooltipTriggerProps,
} from "@/components/ui"
import { cn } from "@/lib/utils"
import IconClipboard from "~icons/lucide/clipboard"
import IconClipboardCheck from "~icons/lucide/clipboard-check"
import IconFile from "~icons/lucide/file"

export type CodeBlockProps = ComponentProps<"pre"> & {
  title?: string
  lang: string
}

export const CodeBlock: Component<CodeBlockProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "ref", "title", "lang"])
  let preRef: HTMLPreElement | undefined

  return (
    <div class="relative mx-auto w-full max-w-screen-md rounded-xl border bg-muted bg-zinc-50 dark:bg-zinc-900/75">
      <div class="peer">
        {props.title && (
          <CodeBlockTitle lang={props.lang}>{props.title}</CodeBlockTitle>
        )}
        <pre
          class={cn("shiki !m-0 grid overflow-auto py-4", local.class)}
          ref={(el) => {
            preRef = el
            if (typeof local.ref === "function") {
              local.ref(el)
            } else {
              // eslint-disable-next-line solid/reactivity
              local.ref = el
            }
          }}
          {...rest}
        />
      </div>
      <CopyButton preRef={preRef} />
    </div>
  )
}

type CodeBlockTitleProps = {
  lang: string
  children?: JSX.Element
}

const CodeBlockTitle: Component<CodeBlockTitleProps> = (props) => {
  return <CodeBlockFileTitle {...props} />
}

const CodeBlockFileTitle: Component<CodeBlockTitleProps> = (props) => {
  return (
    <div class="flex flex-row items-center gap-3 border-b px-4 py-2.5 font-mono">
      <IconFile class="size-4 brightness-90 contrast-75 filter" />
      <span class="text-[0.9rem]">{props.children}</span>
    </div>
  )
}

type CopyButtonProps = {
  class?: string
  preRef: HTMLPreElement | undefined
}

const handleErrors =
  <T extends unknown[]>(fn: (...args: T) => Promise<void>) =>
  (...args: T) => {
    try {
      fn(...args).catch((err) => console.error(err))
    } catch (err) {
      console.error(err)
    }
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
              props.class
            )}
            size="icon"
            variant="ghost"
            onClick={handleErrors(async () => {
              if (!props.preRef) return
              await navigator.clipboard.writeText(
                props.preRef.textContent ?? ""
              )
              setCopied(true)
              setTimeout(() => setCopied(false), 10 * 1000)
            })}
          >
            {copied() ? (
              <IconClipboardCheck class="size-5" />
            ) : (
              <IconClipboard class="size-5" />
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
