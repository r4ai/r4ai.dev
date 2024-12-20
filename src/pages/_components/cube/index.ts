export type { CubeProps } from "./cube"
import { lazy } from "solid-js"

export const Cube = lazy(() =>
  import("./cube").then(({ Cube }) => ({ default: Cube }))
)
