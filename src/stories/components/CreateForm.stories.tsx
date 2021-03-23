import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story } from '@storybook/react/types-6-0';

import  CreateForm  from '../../views/RecordsData/components/CreateFormDialog';

export default {
  title: 'RecordsData/CreateForm',
  component: CreateForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template: Story = (args) => <CreateForm open={true} handleClose={()=>{}}/>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'CreateForm',
};
