import { type FC } from "react";

export const Div: FC<JSX.IntrinsicElements["div"]> = ({
  children,
  ...props
}) => {
  return <div {...props}>{children}</div>;
};
