import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import authNavigation from './auth/index';
import todoNavigation from './todo/index';

const mainNavigation = createStackNavigator(
  {
    Auth: authNavigation,
    Todo: todoNavigation,
  },
  {
    mode: 'modal',
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);
export default createAppContainer(mainNavigation);
