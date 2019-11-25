import {createAppContainer} from "react-navigation";
import {createBottomTabNavigator} from 'react-navigation-tabs';
import ProfileStack from './ProfileStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import SettingStack from './SettingStack';
import {BackHandler, Text, View} from 'react-native';


class HomeTabStack extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    handleBackPress = () => {
        // this.goBack(); // works best when the goBack is async
        console.log("On back pressed");
        return true;
    }

    UNSAFE_componentWillMount() {
        console.log('Componenet Will Mount');
    }

    render() {
        const HomeStack = createAppContainer(
            createBottomTabNavigator(
                {
                    Setting: SettingStack,
                    Profile: ProfileStack,
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
                            if (routeName === 'Setting') {
                                iconName = `ios-options`;
                                // Uncomment to add badges to some icons.
                                // IconComponent = HomeIconWithBadge;
                            } else if (routeName === 'Profile') {
                                iconName = `ios-information-circle${focused ? '' : '-outline'}`;
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

        return (<View style={{flex: 1}}>
            <HomeStack></HomeStack>
        </View>);
    }
}

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


export default HomeTabStack;
