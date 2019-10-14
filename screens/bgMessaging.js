import type { RemoteMessage } from 'react-native-firebase';
import { NativeModules } from 'react-native';
const activityStarter = NativeModules.ActivityStarter;

export default async (message: RemoteMessage) => {
    console.log('Running Headless….');
    return activityStarter.navigateToExample();
}
