import React, { Component } from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
// import NavigationDrawerStructure from './NavigationDrawerStructure';
import Home from '../screens/Setting/HomeScreen'
import LoginScreen from '../screens/Login/LoginScreen';
import FetchExample from '../screens/Setting/FetchExample'
import { connect } from 'react-redux';
import I18n from '../i18n/i18n';
import HomeTabStack from './HomeTabStack';

const AppNavigator = createStackNavigator(
    {

        Auth: { screen: LoginScreen},
        Fetch: { screen: FetchExample},
        Home: {screen: HomeTabStack},

        // Profile: {screen: ProfileScreen},
    },
    // {
    //     initialRouteName: "Drawer",
    //     headerMode: "none",
    // }
);

export default AppNavigator;
