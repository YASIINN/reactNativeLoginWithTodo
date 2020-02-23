import React from 'react';
import {Tab, Text} from 'native-base';
import {appConstants} from '../consts';
const MyTab = props => {
  return (
    <Tab
      activeTabStyle={{backgroundColor: 'red'}}
      heading={props.heading}
      tabStyle={{backgroundColor: 'red'}}
      textStyle={{color: 'blue'}}>
      {props.children}
    </Tab>
  );
};

export default MyTab;
