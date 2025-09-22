import { Meta, StoryObj } from "@storybook/react"

import { Button } from "./button"

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  args: {},
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {}
