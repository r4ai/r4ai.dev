import type { ComponentProps } from "solid-js"
import { toast } from "solid-sonner"
import type { Meta, StoryObj } from "storybook-solidjs"

import { Button } from "@/components/ui"

const meta = {
  title: "UI/Toaster",
  component: (props: ComponentProps<"div">) => <div {...props} />,
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
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Show Toast
      </Button>
    ),
  },
}

export const Submit: Story = {
  args: {
    children: (
      <Button
        variant="outline"
        onClick={() =>
          toast("Successfully submitted!", {
            description: new Date().toLocaleString(),
            action: {
              label: "OK",
              onClick: () => {},
            },
          })
        }
      >
        Submit
      </Button>
    ),
  },
}
