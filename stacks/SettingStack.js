import {createStackNavigator} from 'react-navigation-stack';
import SettingScreen from '../screens/Setting/SettingScreen';
import DateTimePickerScreen from '../screens/Setting/DateTimePickerScreen';
import DetailDateTimeScreen from '../screens/Setting/DetailDateTimeScreen';
import React from 'react';
import HomeTabStack from './HomeTabStack';
import I18n from '../i18n/i18n';
import {BackHandler, View} from 'react-native';
import {createAppContainer} from "react-navigation";

class SettingStack extends React.Component {
    static navigationOptions = ({});

    constructor(props) {
        super(props);
        this.state = {
            i18n: I18n
        };
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
            createStackNavigator({
            Setting: {
                screen: SettingScreen,
            },
            DateTimePicker: {
                screen: DateTimePickerScreen,

            },
            DetailDateTime: {
                screen: DetailDateTimeScreen,

            },
        }
                ,
                {
                    initialRouteName: 'Setting',
                    /* The header config from HomeScreen is now here */
                    defaultNavigationOptions: {
                        // headerStyle: {
                        //     backgroundColor: '#f4511e',
                        // },
                        // headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                        screenProps: {i18n: this.state.i18n, locale: this.state.language}
                    },
                }
        )
        );

        return (
            <Nav style={{flex: 1}}></Nav>
        );
    }
}

// const SettingStack = createStackNavigator({
//     Home: {
//         screen: SettingScreen
//     },
//     DateTimePicker: {screen: DateTimePickerScreen},
//     DetailDateTime: {screen: DetailDateTimeScreen},
// });
export default SettingStack;
