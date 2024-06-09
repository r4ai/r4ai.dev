import type { Meta, StoryObj } from "storybook-solidjs"

import { Kbd } from "./kbd"

const meta = {
  title: "typography/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Kbd>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Ctrl + C",
  },
}
