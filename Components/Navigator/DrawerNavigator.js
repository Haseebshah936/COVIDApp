import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainScreen from '../MainScreen/MainScreen';
import WelcomeScreen from '../Welcome/WelcomeScreen';

const Drawer = createDrawerNavigator();

function DrawerNavigator(props) {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Main" component={MainScreen}/>
            <Drawer.Screen name="WorldUpdate" component={WelcomeScreen}/>
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;