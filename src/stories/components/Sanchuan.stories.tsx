import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story } from '@storybook/react/types-6-0';

import  Sanchuan  from './../../views/Main/components/Sanchuan';

export default {
  title: 'Main/Sanchuan',
  component: Sanchuan,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template: Story = (args) => <Sanchuan />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Sanchuan',
};
