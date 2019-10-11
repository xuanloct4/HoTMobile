
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    StatusBar
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import ProfileScreen from './ProfileScreen';
import { createBottomTabNavigator } from 'react-navigation-tabs';

class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const {navigate} = this.props.navigation;
        return (
            <Button
                title="Go to Jane's profile"
                onPress={() => navigate('Profile', {name: 'Jane'})}
            />
        );
    }
}

// class SettingsScreen extends React.Component {
//     render() {
//         return (
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                 <Text>Settings!</Text>
//             </View>
//         );
//     }
// }
//
// const TabNavigator = createBottomTabNavigator({
//     Home: HomeScreen,
//     Settings: SettingsScreen,
// });
//
// export default createAppContainer(TabNavigator);

export default HomeScreen;
