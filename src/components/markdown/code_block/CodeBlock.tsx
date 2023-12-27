import { type FC } from "react"
import { twMerge } from "tailwind-merge"
import type { CodeBlockProps } from "./CodeBlock.astro"
import { TooltipProvider } from "@/components/ui/tooltip"
import { CopyButton } from "./CopyButton"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

type Props = JSX.IntrinsicElements["pre"] & CodeBlockProps

type CodeProps = JSX.IntrinsicElements["pre"] &
  Pick<CodeBlockProps, "lang" | "title">

const Code: FC<CodeProps> = ({ children, title, lang, ...props }) => {
  return (
    <ScrollArea>
      <pre
        {...props}
        className={twMerge(
          "shiki not-prose flex overflow-auto pb-4",
          title ? "pt-2" : "pt-4",
          props.className
        )}
        data-lang={lang}
      >
        {children}
      </pre>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

export const CodeBlock: FC<Props> = ({
  children,
  code = "",
  title,
  lang,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  range,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showLineNumbers,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  startLine,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  npm2yarn,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  diffIndentSize,
  icon,
  footer = undefined,
  ...props
}) => {
  return (
    <div
      className="prose-pre relative my-6 flex flex-col rounded-xl border bg-neutral-50 dark:bg-neutral-900/75"
      data-code-block
    >
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
      <Code {...props} lang={lang} title={title}>
        {children}
      </Code>
      {footer}
    </div>
  )
}
