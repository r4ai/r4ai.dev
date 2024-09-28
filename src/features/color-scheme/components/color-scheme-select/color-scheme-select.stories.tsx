import type { Meta, StoryObj } from "storybook-solidjs"

import { ColorSchemeSelect } from "./color-scheme-select"

const meta = {
  title: "features/color-scheme/ColorSchemeSelect",
  component: ColorSchemeSelect,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof ColorSchemeSelect>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
