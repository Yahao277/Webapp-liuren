import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story } from '@storybook/react/types-6-0';
import { Provider } from "react-redux";
import configureStore from "./../../redux/store";
import  RecordsTable  from './../../views/RecordsData';

export default {
  title: 'RecordsData/RecordsTable',
  component: RecordsTable,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const store = configureStore()

const Template: Story = (args) => <Provider store={store}><RecordsTable/></Provider>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'RecordsTable',
};
