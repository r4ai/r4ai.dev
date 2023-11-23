/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, type FC, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import type { PreProps } from "./Pre.astro";
import { ClipboardCheckIcon, ClipboardIcon, File } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useHotkeys } from "react-hotkeys-hook";

type Props = JSX.IntrinsicElements["pre"] & PreProps;

export const Pre: FC<Props> = ({
  children,
  code = "",
  title,
  lang,
  range,
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
            {title}
          </div>
          <div className="flex items-center">
            <TooltipProvider>
              <CopyButton code={code} />
            </TooltipProvider>
          </div>
        </div>
      ) : (
        <TooltipProvider>
          <div className="absolute right-0 top-0 flex items-center p-4 pb-8 pl-8 opacity-0 transition hover:opacity-100">
            <CopyButton code={code} />
          </div>
        </TooltipProvider>
      )}
      <pre
        {...props}
        className={twMerge(
          "shiki not-prose flex overflow-auto pb-4",
          title ? "pt-2" : "pt-4",
          props.className,
        )}
      >
        {children}
      </pre>
    </div>
  );
};

const CopyButton: FC<{ code: string }> = ({ code }) => {
  const [hasCopied, setHasCopied] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  let id: NodeJS.Timeout | undefined = undefined;

  const setHovering = () => {
    clearTimeout(id);
    id = setTimeout(() => {
      setIsHovering(true);
    }, 150);
  };

  const clearHovering = () => {
    clearTimeout(id);
    id = setTimeout(() => {
      setIsHovering(false);
    }, 100);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setHasCopied(true);
  };

  useHotkeys("esc", () => {
    if (isHovering) setIsHovering(false);
  });
  useHotkeys("space", () => {
    if (isHovering) setIsHovering(false);
  });
  useHotkeys("enter", () => {
    if (isHovering) setIsHovering(false);
  });

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
  );
};
