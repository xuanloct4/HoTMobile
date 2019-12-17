import {createStackNavigator} from 'react-navigation-stack';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import DeviceManageScreen from '../screens/Profile/DeviceManageScreen';
import BoardManageScreen from '../screens/Profile/BoardManageScreen';
import TermConditionScreen from '../screens/Profile/TermConditionScreen';
import AboutScreen from '../screens/Profile/AboutScreen';
import React from 'react';
import AccountInfoScreen from '../screens/Profile/AccountInfoScreen';
import I18n from '../i18n/i18n';
import {createAppContainer} from "react-navigation";
import SettingStack from './SettingStack';


class ProfileStack extends React.Component {
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
                    Main: {
                        screen: ({navigation}) => <ProfileScreen navigation={navigation} screenProps={{ parentNavigation: this.props.screenProps.parentNavigation}} />,

                    },
                    AccountInfo: AccountInfoScreen,
                    Devices: DeviceManageScreen,
                    Boards: BoardManageScreen,
                    TermCondition: TermConditionScreen,
                    About: AboutScreen,
                },
                {
                    initialRouteName: 'Main',
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

export default ProfileStack;
