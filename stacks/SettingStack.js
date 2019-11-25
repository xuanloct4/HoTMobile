import {createStackNavigator} from 'react-navigation-stack';
import SettingScreen from '../screens/Setting/SettingScreen';
import DateTimePickerScreen from '../screens/Setting/DateTimePickerScreen';
import DetailDateTimeScreen from '../screens/Setting/DetailDateTimeScreen';
import React from 'react';
import HomeTabStack from './HomeTabStack';

const SettingStack = createStackNavigator({
    Home: {screen: SettingScreen,
    //     navigationOptions: {
    //     headerLeft: null,
    //     gesturesEnabled: false,
    //     headerVisible: false,
    // }
},
    DateTimePicker: {screen: DateTimePickerScreen},
    DetailDateTime: {screen: DetailDateTimeScreen},
});

export default SettingStack;
