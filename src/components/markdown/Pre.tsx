import { type FC } from "react";
import { twMerge } from "tailwind-merge";

export const Pre: FC<JSX.IntrinsicElements["pre"]> = ({
  children,
  ...props
}) => {
  return (
    <div className="prose-none my-6 rounded-lg border bg-neutral-900/75">
      <pre
        {...props}
        className={twMerge("shiki not-prose m-4 flex", props.className)}
      >
        {children}
      </pre>
    </div>
  );
};
