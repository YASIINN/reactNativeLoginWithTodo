import React from 'react';
import {Tabs} from 'native-base';
import {appConstants} from '../consts';
const MyTabs = props => {
  return (
    <Tabs tabBarBackgroundColor={appConstants.colors.primary} {...props}>
      {props.children}
    </Tabs>
  );
};

export default MyTabs;
