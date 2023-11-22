import { type FC } from "react";
import { twMerge } from "tailwind-merge";

export const Pre: FC<JSX.IntrinsicElements["pre"]> = ({
  children,
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
