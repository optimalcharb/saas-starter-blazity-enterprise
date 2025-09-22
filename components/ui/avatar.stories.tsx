import { Meta, StoryObj } from "@storybook/react"

import { Avatar } from "./avatar"

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  args: {},
}

export default meta

type Story = StoryObj<typeof Avatar>

export const Default: Story = {}
