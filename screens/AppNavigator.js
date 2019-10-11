import React, { Component } from 'react';
import {Text} from 'react-native';
import { createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// import NavigationDrawerStructure from './NavigationDrawerStructure';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

const AppNavigator = createStackNavigator(
    {
        // Auth: {
        //     screen: LoginScreen,
        // },
        Home: {screen: HomeScreen},
        Profile: {screen: ProfileScreen},
    },
    // {
    //     initialRouteName: "Drawer",
    //     headerMode: "none",
    // }
);

export default AppNavigator;
