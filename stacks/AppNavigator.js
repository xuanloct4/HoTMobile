import React, {Component} from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
// import NavigationDrawerStructure from './NavigationDrawerStructure';
import Home from '../screens/Setting/SettingScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import FetchExample from '../screens/Setting/FetchExample';
import {connect} from 'react-redux';
import I18n from '../i18n/i18n';
import HomeTabStack from './HomeTabStack';
import SplashScreen from '../screens/Splash/SplashScreen';

const AppNavigator = createStackNavigator(
    {
        Splash: {
            screen: SplashScreen, navigationOptions: {
                header: null,
                headerLeft: null,
                gesturesEnabled: false,
            },
        },
        Auth: {
            screen: LoginScreen, navigationOptions: {
                headerLeft: null,
                gesturesEnabled: false,
            },
        },
        Fetch: {screen: FetchExample},
        Home: {
            screen: HomeTabStack, navigationOptions: {
                header: null,
                gesturesEnabled: false,
                headerVisible: false,
            },
        },

        // Profile: {screen: ProfileScreen},
    },
    // {
    //     initialRouteName: "Drawer",
    //     headerMode: "none",
    // }
);

export default AppNavigator;
