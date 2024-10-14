import type { ComponentProps } from "solid-js"
import type { Meta, StoryObj } from "storybook-solidjs"

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
  TextField,
  TextFieldLabel,
  TextFieldRoot,
} from "@/components/ui"

const meta = {
  title: "UI/Tabs",
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
      <Tabs defaultValue="account" class="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsIndicator />
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent class="space-y-2">
              <TextFieldRoot class="space-y-1">
                <TextFieldLabel>Name</TextFieldLabel>
                <TextField />
              </TextFieldRoot>
              <TextFieldRoot class="space-y-1">
                <TextFieldLabel>Username</TextFieldLabel>
                <TextField />
              </TextFieldRoot>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent class="space-y-2">
              <TextFieldRoot class="space-y-1">
                <TextFieldLabel>Current password</TextFieldLabel>
                <TextField />
              </TextFieldRoot>
              <TextFieldRoot class="space-y-1">
                <TextFieldLabel>New password</TextFieldLabel>
                <TextField />
              </TextFieldRoot>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    ),
  },
}
