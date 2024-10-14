import type { ComponentProps } from "solid-js"
import type { Meta, StoryObj } from "storybook-solidjs"

import { Skeleton } from "./skeleton"

const meta = {
  title: "UI/Skeleton",
  component: (props: ComponentProps<"div">) => <div {...props} />,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Skeleton>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div class="flex items-center space-x-4">
        <Skeleton class="h-12 w-12 rounded-full" />
        <div class="space-y-2">
          <Skeleton class="h-4 w-[250px]" />
          <Skeleton class="h-4 w-[200px]" />
        </div>
      </div>
    ),
  },
}
