import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    StatusBar,
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login',
    };
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/* other code from before here */}
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
            </View>
        );
    }
    // render() {
    //     const {navigate} = this.props.navigation;
    //     return (
    //         <Button
    //             title="Go to Jane's profile"
    //             onPress={() => navigate('Profile', {name: 'Jane'})}
    //         />
    //     );
    // }
}

export default LoginScreen;
