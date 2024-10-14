import type { Meta, StoryObj } from "storybook-solidjs"

import { Icon, IconFallback, IconRoot } from "./icon"

const meta = {
  title: "UI/Icon",
  component: () => (
    <IconRoot>
      <Icon src="https://github.com/r4ai.png" alt="hngngn" />
      <IconFallback>Rai</IconFallback>
    </IconRoot>
  ),
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Icon>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
