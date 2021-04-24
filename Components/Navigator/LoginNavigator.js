import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from '../Login/LoginForm';
import RegisterForm from '../Login/RegisterForm';
import DrawerNavigator from './DrawerNavigator';
import LoadingScreen from '../LoadingScreen';

const Stack = createStackNavigator();

function LoginNavigator(props) {
  return (
    <Stack.Navigator headerMode={'none'} mode={'modal'}>
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="Login" component={LoginForm} />
      <Stack.Screen name="Register" component={RegisterForm} />
      <Stack.Screen name="Home" component={DrawerNavigator} />
    </Stack.Navigator>
  );
}

export default LoginNavigator;