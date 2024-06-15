import type { Meta, StoryObj } from "storybook-solidjs"

import {
  List,
  ListItem,
  OrderedList as OrderedListComponent,
} from "~/components/typography"

const meta = {
  title: "typography/List",
  component: List,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof List>
export default meta

type Story = StoryObj<typeof meta>

export const UnorderedList: Story = {
  args: {
    children: (
      <>
        <ListItem>Item 1</ListItem>
        <ListItem>
          Item 2
          <List>
            <ListItem>Item 2.1</ListItem>
            <ListItem>Item 2.2</ListItem>
          </List>
        </ListItem>
        <ListItem>Item 3</ListItem>
      </>
    ),
  },
}

export const OrderedList: Story = {
  args: {
    children: (
      <OrderedListComponent>
        <ListItem>Item 1</ListItem>
        <ListItem>
          Item 2
          <OrderedListComponent>
            <ListItem>Item 2.1</ListItem>
            <ListItem>Item 2.2</ListItem>
          </OrderedListComponent>
        </ListItem>
        <ListItem>Item 3</ListItem>
      </OrderedListComponent>
    ),
  },
}
