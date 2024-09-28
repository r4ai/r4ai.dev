import type { Meta, StoryObj } from "storybook-solidjs"

import { Separator } from "./separator"

const meta = {
  title: "typography/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {},
} satisfies Meta<typeof Separator>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
