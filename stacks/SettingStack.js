import {createStackNavigator} from 'react-navigation-stack';
import SettingScreen from '../screens/Setting/SettingScreen';

const SettingStack = createStackNavigator({
    Home: SettingScreen,
});

export default SettingStack;
