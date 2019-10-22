import React, { Component } from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
// import NavigationDrawerStructure from './NavigationDrawerStructure';
import Home from './HomeScreen'
import LoginScreen from './LoginScreen';
import FetchExample from './FetchExample'
import { connect } from 'react-redux';
import I18n from '../i18n/i18n';

const AppNavigator = createStackNavigator(
    {

        Auth: { screen: LoginScreen},
        Fetch: { screen: FetchExample},
        Home: {screen: Home},

        // Profile: {screen: ProfileScreen},
    },
    // {
    //     initialRouteName: "Drawer",
    //     headerMode: "none",
    // }
);

export default AppNavigator;
