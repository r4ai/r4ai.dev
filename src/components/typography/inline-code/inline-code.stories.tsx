import type { Meta, StoryObj } from "storybook-solidjs"

import { InlineCode } from "."

const meta = {
  title: "typography/InlineCode",
  component: InlineCode,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof InlineCode>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'print("Hello, World!")',
  },
}
