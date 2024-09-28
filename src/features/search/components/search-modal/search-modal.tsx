import { Dialog } from "@kobalte/core/dialog"
import { type Component } from "solid-js"

import {
  DialogContent,
  DialogTrigger,
  type DialogTriggerProps,
} from "@/components/ui"
import { Search } from "@/features/search"

export type SearchModalProps = {
  trigger?: Component<DialogTriggerProps>
}

export const SearchModal: Component<SearchModalProps> = (props) => {
  return (
    <Dialog>
      <DialogTrigger as={props.trigger} />
      <DialogContent
        class="!data-[expanded]:slide-in-from-top-1/10 !data-[closed]:slide-out-to-top-1/10 top-[10%] max-h-[80%] w-full max-w-screen-sm translate-y-0 border p-0"
        closeButton={false}
      >
        <Search />
      </DialogContent>
    </Dialog>
  )
}
