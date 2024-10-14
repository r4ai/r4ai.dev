import { format } from "@formkit/tempo"
import { splitProps } from "solid-js"

import {
  Tooltip,
  TooltipContent,
  type TooltipProps,
  TooltipTrigger,
} from "@/components/ui"
import IconRefreshCcw from "~icons/lucide/refresh-ccw"

export type UpdatedAtProps = TooltipProps & {
  updatedAt: Date
}

export const UpdatedAt = (props: UpdatedAtProps) => {
  const [local, rest] = splitProps(props, ["updatedAt"])

  return (
    <Tooltip {...rest}>
      <TooltipTrigger class="flex flex-row items-center gap-1">
        <IconRefreshCcw />
        <span>{format(local.updatedAt, "medium", "ja")}</span>
      </TooltipTrigger>
      <TooltipContent class="font-bold">最終更新日</TooltipContent>
    </Tooltip>
  )
}
