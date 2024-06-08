import { clientOnly } from "@solidjs/start"

export type { CubeProps } from "./cube"
export const Cube = clientOnly(() =>
  import("./cube").then((module) => ({
    default: module.Cube,
  })),
)
