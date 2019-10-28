import {createStackNavigator} from 'react-navigation-stack';
import SettingScreen from '../screens/Setting/HomeScreen';

const SettingStack = createStackNavigator({
    Home: SettingScreen,
});

export default SettingStack;
