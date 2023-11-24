import { type FC } from "react"
import { twMerge } from "tailwind-merge"
import type { CodeBlockProps } from "./CodeBlock.astro"
import { TooltipProvider } from "@/components/ui/tooltip"
import { CopyButton } from "./CopyButton"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

type Props = JSX.IntrinsicElements["pre"] & CodeBlockProps

export const CodeBlock: FC<Props> = ({
  children,
  code = "",
  title,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lang,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  range,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showLineNumbers,
  icon,
  ...props
}) => {
  return (
    <div className="prose-none relative my-6 flex flex-col rounded-xl border bg-neutral-50 dark:bg-neutral-900/75">
      {title ? (
        <div className="flex flex-row justify-between border-b px-4 py-2">
          <div className="flex flex-row items-center gap-3 font-mono">
            {icon}
            <span className="text-[0.9rem]">{title}</span>
          </div>
          <div className="flex items-center">
            <TooltipProvider>
              <CopyButton code={code} />
            </TooltipProvider>
          </div>
        </div>
      ) : (
        <TooltipProvider>
          <div className="absolute right-0 top-0 z-10 flex items-center p-4 pb-8 pl-8 opacity-0 transition hover:opacity-100">
            <CopyButton code={code} />
          </div>
        </TooltipProvider>
      )}
      <ScrollArea>
        <pre
          {...props}
          className={twMerge(
            "shiki not-prose flex overflow-auto pb-4",
            title ? "pt-2" : "pt-4",
            props.className
          )}
        >
          {children}
        </pre>
        <ScrollBar
          orientation="horizontal"
          thumbClassName="hover:bg-neutral-300 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:active:bg-neutral-600 transition-colors"
        />
      </ScrollArea>
    </div>
  )
}
