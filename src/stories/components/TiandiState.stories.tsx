import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story } from '@storybook/react/types-6-0';

import  TiandiState  from './../../views/Main/components/TiandiState';

export default {
  title: 'Main/TiandiState',
  component: TiandiState,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template: Story = (args) => <TiandiState />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'TiandiState',
};
