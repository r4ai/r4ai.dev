import { Dialog } from "@kobalte/core/dialog"
import { type Component } from "solid-js"

import {
  Button,
  DialogContent,
  DialogTrigger,
  type DialogTriggerProps,
} from "~/components/ui"

import { Search } from "../search/search"

export type SearchModalProps = {
  class?: string
}

export const SearchModal: Component<SearchModalProps> = () => {
  return (
    <Dialog>
      <DialogTrigger
        as={(props: DialogTriggerProps) => (
          <Button variant="outline" {...props}>
            Search
          </Button>
        )}
      />
      <DialogContent
        class="top-[10%] max-h-[80%] w-full max-w-screen-sm translate-y-0 border p-0 data-[closed]:slide-out-to-top-[10%] data-[expanded]:slide-in-from-top-[10%]"
        closeButton={false}
      >
        <Search />
      </DialogContent>
    </Dialog>
  )
}
