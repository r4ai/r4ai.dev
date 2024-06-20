import { type ComponentProps } from "solid-js"
import type { Meta, StoryObj } from "storybook-solidjs"

import { TextFieldRoot } from "../text-field"
import { TextArea } from "./text-area"

const meta = {
  title: "UI/TextArea",
  component: (props) => (
    <div {...(props as unknown as ComponentProps<"div">)} />
  ),
  tags: ["autodocs"],
  args: {
    children: (
      <TextFieldRoot class="mx-auto max-w-xs w-full">
        <TextArea placeholder="Type your message here." />
      </TextFieldRoot>
    ),
  },
} satisfies Meta<typeof TextFieldRoot>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <TextFieldRoot class="mx-auto max-w-xs w-full">
        <TextArea placeholder="Type your message here." />
      </TextFieldRoot>
    ),
  },
}
