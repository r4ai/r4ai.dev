/* eslint-disable @typescript-eslint/no-unused-vars */
import { type FC } from "react";
import { twMerge } from "tailwind-merge";
import type { PreProps } from "./Pre.astro";

type Props = JSX.IntrinsicElements["pre"] & PreProps;

export const Pre: FC<Props> = ({
  children,
  code = "",
  title,
  lang,
  range,
  showLineNumbers,
  ...props
}) => {
  return (
    <div className="prose-none my-6 rounded-xl border bg-neutral-50 dark:bg-neutral-900/75">
      <pre
        {...props}
        className={twMerge(
          "shiki not-prose flex overflow-auto p-4",
          props.className,
        )}
      >
        {children}
      </pre>
    </div>
  );
};
