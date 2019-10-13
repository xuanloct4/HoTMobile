import React, { Component } from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
// import NavigationDrawerStructure from './NavigationDrawerStructure';
import Home from './HomeScreen'
import LoginScreen from './LoginScreen';
import FetchExample from './FetchExample'
const AppNavigator = createStackNavigator(
    {
        Fetch: { screen: FetchExample},
        Auth: { screen: LoginScreen},
        Home: {screen: Home},

        // Profile: {screen: ProfileScreen},
    },
    // {
    //     initialRouteName: "Drawer",
    //     headerMode: "none",
    // }
);

export default AppNavigator;
