import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from '../../screens/LoginScreen';
import ForgotPassowordcreen from '../../screens/ForgotPasswordScreen';
import RegisterScreen from '../../screens/RegisterScreen';
const authScreen = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    ForgotPassword: {
      screen: ForgotPassowordcreen,
    },
    Register: {
      screen: RegisterScreen,
    },
  },
  {
    mode: 'modal',
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);
export default authScreen;
