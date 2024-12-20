import { Dialog } from "@kobalte/core/dialog"
import { type Component } from "solid-js"

import {
  Button,
  DialogContent,
  DialogTrigger,
  type DialogTriggerProps,
} from "@/components/ui"
import { Search } from "@/features/search"
import type { PartiallyPartial } from "@/lib/utils"
import IconSearch from "~icons/lucide/search"

export type SearchModalProps = PartiallyPartial<DialogTriggerProps, "as">

export const SearchModal: Component<SearchModalProps> = (props) => {
  return (
    <Dialog>
      <DialogTrigger
        as={(props: DialogTriggerProps) => (
          <Button variant="ghost" size="icon" class="rounded-full" {...props}>
            <IconSearch class="size-5" />
          </Button>
        )}
        {...props}
      />
      <DialogContent
        class="!data-[expanded]:slide-in-from-top-1/10 !data-[closed]:slide-out-to-top-1/10 top-[10%] grid max-h-[80%] w-full max-w-screen-sm translate-y-0 grid-cols-1 grid-rows-1 border p-0"
        closeButton={false}
      >
        <Search />
      </DialogContent>
    </Dialog>
  )
}
