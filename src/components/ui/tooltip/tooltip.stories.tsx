import type { ComponentProps } from "solid-js"
import type { Meta, StoryObj } from "storybook-solidjs"

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  type TooltipTriggerProps,
} from "~/components/ui"

const meta = {
  title: "UI/Tooltip",
  component: (props) => <div {...props} />,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<ComponentProps<"div">>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <Tooltip>
        <TooltipTrigger
          as={(props: TooltipTriggerProps) => (
            <Button variant="outline" {...props}>
              Hover
            </Button>
          )}
        />
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    ),
  },
}
