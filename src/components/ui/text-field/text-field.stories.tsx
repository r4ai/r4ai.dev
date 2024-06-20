import type { Meta, StoryObj } from "storybook-solidjs"

import { TextField, TextFieldRoot } from "./text-field"

const meta = {
  title: "UI/TextField",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: (props: any) => <div {...props} />,
  tags: ["autodocs"],
} satisfies Meta<typeof TextFieldRoot>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <TextFieldRoot class="mx-auto max-w-xs w-full">
        <TextField type="email" placeholder="Email" />
      </TextFieldRoot>
    ),
  },
}
