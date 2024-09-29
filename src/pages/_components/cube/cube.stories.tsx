import type { Meta, StoryObj } from "storybook-solidjs"

import { Cube } from "."

const meta = {
  title: "routes/home/Cube",
  component: Cube,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    class: "size-96",
  },
} satisfies Meta<typeof Cube>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
