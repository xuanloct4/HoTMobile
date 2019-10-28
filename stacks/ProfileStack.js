import {createStackNavigator} from 'react-navigation-stack';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import DeviceManageScreen from '../screens/Profile/DeviceManageScreen';
import BoardManageScreen from '../screens/Profile/BoardManageScreen';
import TermConditionScreen from '../screens/Profile/TermConditionScreen';
import AboutScreen from '../screens/Profile/AboutScreen';
import React from 'react';
import AccountInfoScreen from '../screens/Profile/AccountInfoScreen';


// class ProfileStack extends React.Component {
//     static navigationOptions = {
//         header: null,
//     };
//
//     constructor(props) {
//         super(props);
//     }
//
//     render() {
//         return createStackNavigator({
//             Main: ProfileScreen,
//             Devices: DeviceManageScreen,
//             Boards: BoardManageScreen,
//             TermCondition: TermConditionScreen,
//             About: AboutScreen,
//         });
//     }
// }

const ProfileStack = createStackNavigator({
    Main: ProfileScreen,
    AccountInfo: AccountInfoScreen,
    Devices: DeviceManageScreen,
    Boards: BoardManageScreen,
    TermCondition: TermConditionScreen,
    About: AboutScreen,
});

export default ProfileStack;
