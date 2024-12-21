import type { Meta, StoryObj } from "storybook-solidjs"

import { Heading } from "./heading"

const meta = {
  title: "typography/Heading",
  component: Heading,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    level: {
      control: {
        type: "select",
      },
      options: ["h1", "h2", "h3", "h4"],
    },
  },
  args: {
    children: "Heading",
  },
} satisfies Meta<typeof Heading>
export default meta

type Story = StoryObj<typeof meta>

export const H1: Story = {
  args: {
    level: "h1",
    children: "Heading 1",
  },
}

export const H2: Story = {
  args: {
    level: "h2",
    children: "Heading 2",
  },
}

export const H3: Story = {
  args: {
    level: "h3",
    children: "Heading 3",
  },
}

export const H4: Story = {
  args: {
    level: "h4",
    children: "Heading 4",
  },
}
