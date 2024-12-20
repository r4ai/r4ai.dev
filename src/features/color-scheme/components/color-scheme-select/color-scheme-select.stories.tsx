import type { Meta, StoryObj } from "storybook-solidjs"

import { ColorSchemeSelectInner } from "./color-scheme-select"

const meta = {
  title: "features/color-scheme/ColorSchemeSelect",
  component: ColorSchemeSelectInner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof ColorSchemeSelectInner>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
