import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    Alert
} from 'react-native';
class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile',
    };
    render() {
        const {navigate} = this.props.navigation;
        return (
            <Button
                title="Welcome"
                onPress={() => navigate('Home', {name: 'Jane'})}
            />
        );
    }
}

export default ProfileScreen;
