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
import {createAppContainer} from 'react-navigation';
import DeviceManageScreen from '../screens/Profile/DeviceManageScreen';

class AppNavigator extends React.Component {
    static navigationOptions = ({});

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        // this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        // console.log("I18: ", this.state.i18n);
    }

    componentWillUnmount() {
        // this.backHandler.remove();
    }

    handleBackPress = () => {
        // this.goBack(); // works best when the goBack is async
        console.log('On back pressed');
        return true;
    };

    UNSAFE_componentWillMount() {
        console.log('Componenet Will Mount');
        // this.props.navigation.navigate('Home', {
        //     screenProps: {i18n: this.state.i18n, locale: this.state.language},
        // });
    }

    render() {

        const Nav = createAppContainer(
            createStackNavigator(
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
                        screen: ({navigation, screenProps}) =>
                            <HomeTabStack screenProps={{parentNavigation: navigation, ...screenProps}}/>,
                        navigationOptions: {
                            header: null,
                            gesturesEnabled: false,
                            headerVisible: false,
                        },
                        // screen: HomeTabStack, navigationOptions: {
                        //     header: null,
                        //     // gesturesEnabled: false,
                        //     headerVisible: false,
                        // },
                    },
                    Devices: DeviceManageScreen,
                },
                // {
                //     initialRouteName: "Drawer",
                //     headerMode: "none",
                // }
            )
        );

        return (
            <Nav style={{flex: 1}}></Nav>
        );
    }
}

// const AppNavigator =  createStackNavigator(
//     {
//         Splash: {
//             screen: SplashScreen, navigationOptions: {
//                 header: null,
//                 headerLeft: null,
//                 gesturesEnabled: false,
//             },
//         },
//         Auth: {
//             screen: LoginScreen, navigationOptions: {
//                 headerLeft: null,
//                 // gesturesEnabled: false,
//             },
//         },
//         Fetch: {screen: FetchExample},
//         Home: {
//             screen: ({navigation, screenProps}) =>
//                 <HomeTabStack screenProps={{parentNavigation: navigation, ...screenProps}}/>,
//             navigationOptions: {
//                 header: null,
//                 // gesturesEnabled: false,
//                 headerVisible: false,
//             },
//             // screen: HomeTabStack, navigationOptions: {
//             //     header: null,
//             //     // gesturesEnabled: false,
//             //     headerVisible: false,
//             // },
//         },
//
//         // Profile: {screen: ProfileScreen},
//     },
//     // {
//     //     initialRouteName: "Drawer",
//     //     headerMode: "none",
//     // }
// );

export default AppNavigator;
