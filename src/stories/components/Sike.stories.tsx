import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story } from '@storybook/react/types-6-0';

import  Sike  from './../../views/Main/components/Sike';

export default {
  title: 'Main/Sike',
  component: Sike,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template: Story = (args) => <Sike />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Sike',
};
