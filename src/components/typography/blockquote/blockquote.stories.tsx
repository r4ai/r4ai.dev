import type { Meta, StoryObj } from "storybook-solidjs"

import { Blockquote } from "@/components/typography"

const meta = {
  title: "typography/Blockquote",
  component: Blockquote,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Blockquote>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Done is better than perfect.",
  },
}
