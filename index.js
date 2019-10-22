/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import type { RemoteMessage } from 'react-native-firebase';
import { NativeModules } from 'react-native';
const activityStarter = NativeModules.ActivityStarter;

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', (message: RemoteMessage) => {
    console.log('Running Headless….');
    return activityStarter.navigateToExample();
});


