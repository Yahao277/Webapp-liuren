import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story } from '@storybook/react/types-6-0';

import  ItemCard  from './../../views/Main/components/ItemCard';

import { Zhi,Jiang,DiZhi as D, TianJiang as T } from '../../core/liuren/GanZhi';
export default {
  title: 'Main/ItemCard',
  component: ItemCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template: Story = (args) => <ItemCard jiang={T.getByName("贵")} bot={D.getByName("寅")} top={D.getByName("巳")}/>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'ItemCard',
};
