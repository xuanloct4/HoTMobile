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
// import { Ionicons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from './ProfileScreen';
import DetailsSCreen from './DetailsScreen';



class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
    };
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/* other code from before here */}
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
            </View>
        );
    }

}

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Details: DetailsSCreen,
});

const SettingsStack = createStackNavigator({
    Settings: ProfileScreen,
    Details: DetailsSCreen,
});


class IconWithBadge extends React.Component {
    render() {
        const {name, badgeCount, color, size} = this.props;
        return (
            <View style={{width: 24, height: 24, margin: 5}}>
                <Ionicons name={name} size={size} color={color}/>
                {badgeCount > 0 && (
                    <View
                        style={{
                            // /If you're using react-native < 0.57 overflow outside of the parent
                            // will not work on Android, see https://git.io/fhLJ8
                            position: 'absolute',
                            right: -6,
                            top: -3,
                            backgroundColor: 'red',
                            borderRadius: 6,
                            width: 12,
                            height: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
                            {badgeCount}
                        </Text>
                    </View>
                )}
            </View>
        );
    }
}

const HomeIconWithBadge = props => {
    // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
    return <IconWithBadge {...props} badgeCount={3}/>;
};

const getTabBarIcon = (navigation, focused, tintColor) => {
    const {routeName} = navigation.state;
    let IconComponent = Ionicons;
    let iconName;
    if (routeName === 'Home') {
        iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        // We want to add badges to home tab icon
        IconComponent = HomeIconWithBadge;
    } else if (routeName === 'Settings') {
        iconName = `ios-options${focused ? '' : '-outline'}`;
    }

    // You can return any component that you like here!
    return <IconComponent name={iconName} size={25} color={tintColor}/>;
};


const Home = createAppContainer(
    createBottomTabNavigator(
        {
            Home: HomeStack,
            Settings: ProfileScreen,
        },
        {
            // defaultNavigationOptions: ({ navigation }) => ({
            //     tabBarIcon: ({ focused, tintColor }) =>
            //         getTabBarIcon(navigation, focused, tintColor),
            // }),
            // tabBarOptions: {
            //     activeTintColor: 'tomato',
            //     inactiveTintColor: 'gray',
            // },

            defaultNavigationOptions: ({navigation}) => ({
                tabBarIcon: ({focused, horizontal, tintColor}) => {
                    const {routeName} = navigation.state;
                    let IconComponent = Ionicons;
                    let iconName;
                    if (routeName === 'Home') {
                        iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                        // Sometimes we want to add badges to some icons.
                        // You can check the implementation below.
                        IconComponent = HomeIconWithBadge;
                    } else if (routeName === 'Settings') {
                        iconName = `ios-options`;
                    }

                    // You can return any component that you like here!
                    return <IconComponent name={iconName} size={25} color={tintColor}/>;
                },
            }),
            tabBarOptions: {
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            },
        },
    ),
);

export default Home;
