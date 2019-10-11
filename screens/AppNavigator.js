import React, { Component } from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
// import NavigationDrawerStructure from './NavigationDrawerStructure';
import Home from './HomeScreen'
import LoginScreen from './LoginScreen';
import FetchExample from './FetchExample'
const AppNavigator = createStackNavigator(
    {
        Auth: { screen: LoginScreen},
        Home: {screen: Home},
        Fetch: { screen: FetchExample},
        // Profile: {screen: ProfileScreen},
    },
    // {
    //     initialRouteName: "Drawer",
    //     headerMode: "none",
    // }
);

export default AppNavigator;
