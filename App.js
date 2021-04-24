import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import DrawerNavigator from './Components/Navigator/DrawerNavigator'
import LoginNavigator from './Components/Navigator/LoginNavigator'
import LoginForm from './Components/Login/LoginForm';
import RegisterForm from './Components/Login/RegisterForm';



export default function App() {
  return (

    
    // <NavigationContainer>
    //     <DrawerNavigator />
    // </NavigationContainer>
    // <LoginForm></LoginForm>
    // <RegisterForm />
    <NavigationContainer>
        <LoginNavigator />
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
