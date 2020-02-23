import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import TodoScreen from '../../screens/TodoScreen';
import NewTodoScreen from '../../screens/NewTodoScreen';
const todoScreen = createStackNavigator(
  {
    Todo: {
      screen: TodoScreen,
    },
    NewTodo: {
      screen: NewTodoScreen,
    },
  },
  {
    mode: 'modal',
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);
export default todoScreen;
