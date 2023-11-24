import { useState, type FC } from "react"
import { ClipboardCheckIcon, ClipboardIcon } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useHotkeys } from "react-hotkeys-hook"

export const CopyButton: FC<{ code: string }> = ({ code }) => {
  const [hasCopied, setHasCopied] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  let id: NodeJS.Timeout | undefined = undefined

  const setHovering = () => {
    clearTimeout(id)
    id = setTimeout(() => {
      setIsHovering(true)
    }, 200)
  }

  const clearHovering = () => {
    clearTimeout(id)
    id = setTimeout(() => {
      setIsHovering(false)
    }, 100)
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setHasCopied(true)
  }

  useHotkeys("esc", () => {
    if (isHovering) setIsHovering(false)
  })
  useHotkeys("space", () => {
    if (isHovering) setIsHovering(false)
  })
  useHotkeys("enter", () => {
    if (isHovering) setIsHovering(false)
  })

  return (
    <Tooltip open={isHovering}>
      <TooltipTrigger
        onMouseEnter={setHovering}
        onMouseLeave={clearHovering}
        onFocus={setHovering}
        onBlur={clearHovering}
        onClick={copyToClipboard}
        className="text-neutral-400 transition hover:text-black dark:text-neutral-600 dark:hover:text-neutral-300"
        asChild
      >
        <button>
          {hasCopied ? (
            <ClipboardCheckIcon className="h-5 w-5" />
          ) : (
            <ClipboardIcon className="h-5 w-5" />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        className="border bg-popover/60 p-2 text-popover-foreground backdrop-blur-xl"
      >
        <span>{hasCopied ? "Copied!" : "Copy to clipboard"}</span>
      </TooltipContent>
    </Tooltip>
  )
}
