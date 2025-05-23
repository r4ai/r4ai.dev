import type { Meta, StoryObj } from "storybook-solidjs"

import { Button, type ButtonProps } from "@/components/ui"

import { SearchModal } from "./search-modal"

const meta = {
  title: "features/search/SearchModal",
  component: SearchModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    trigger: (props: ButtonProps) => (
      <Button variant="outline" {...props}>
        Search
      </Button>
    ),
  },
} satisfies Meta<typeof SearchModal>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
