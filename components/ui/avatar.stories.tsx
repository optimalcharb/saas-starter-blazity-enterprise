import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { Avatar } from './avatar';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  args: {
    ref: 'Ref<HTMLSpanElement>' as unknown as any,
    key: 'Key' as unknown as any
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => (
  <Avatar {...args} />
);

export const Story = Template.bind({});
Story.args = {};
