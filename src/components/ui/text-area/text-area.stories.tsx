import { type ComponentProps } from "solid-js"
import type { Meta, StoryObj } from "storybook-solidjs"

import { TextFieldRoot } from "../text-field"
import { TextArea } from "./text-area"

const meta = {
  title: "UI/TextArea",
  component: (props: ComponentProps<"div">) => <div {...props} />,
  tags: ["autodocs"],
  args: {
    children: (
      <TextFieldRoot class="mx-auto w-full max-w-xs">
        <TextArea placeholder="Type your message here." onInput={() => {}} />
      </TextFieldRoot>
    ),
  },
} satisfies Meta<ComponentProps<"div">>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <TextFieldRoot class="mx-auto w-full max-w-xs">
        <TextArea placeholder="Type your message here." onInput={() => {}} />
      </TextFieldRoot>
    ),
  },
}
