import type { ComponentProps } from "solid-js"
import type { Meta, StoryObj } from "storybook-solidjs-vite"

import { Switch, SwitchControl, SwitchLabel, SwitchThumb } from "./switch"

const meta = {
  title: "UI/Switch",
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
      <Switch class="flex items-center gap-x-2 pl-2">
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <SwitchLabel class="data-disabled:cursor-not-allowed data-disabled:opacity-70 text-sm font-medium leading-none">
          Airplane Mode
        </SwitchLabel>
      </Switch>
    ),
  },
}
