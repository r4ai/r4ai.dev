import { type Component, type ComponentProps, splitProps } from "solid-js"

export type IconBlobsClipPathProps = ComponentProps<"svg"> & {
  clipPathId: string
}

export const IconBlobsClipPath: Component<IconBlobsClipPathProps> = (props) => {
  const [local, rest] = splitProps(props, ["clipPathId"])
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" {...rest}>
      <clipPath id={local.clipPathId} clipPathUnits="objectBoundingBox">
        <path
          d="M137.563 0.00991593C206.548 -0.836435 261.231 52.6129 279.301 115.473C294.917 169.799 259.023 221.015 210.493 253.718C163.476 285.401 101.678 298.349 54.383 267.037C4.87748 234.263 -10.3324 173.582 6.72698 118.817C25.602 58.2236 70.669 0.830612 137.563 0.00991593Z"
          transform="scale(0.00353356890459363957597173144876 0.00350877192982456140350877192982)"
        />
      </clipPath>
    </svg>
  )
}
