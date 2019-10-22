
import PushNotificationIOS, {AppState, NativeModules} from 'react-native';
import PubNubReact from 'pubnub-react';
import type { RemoteMessage } from 'react-native-firebase';
import { NativeModules } from 'react-native';
const activityStarter = NativeModules.ActivityStarter;

// export default async (message: RemoteMessage) => {
//     console.log('Running Headless….');
//     return activityStarter.navigateToExample();
// }

export default async () => {
    var PushNotification = require("react-native-push-notification");

    PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function(token) {
            console.log("TOKEN:", token);
        },

        // (required) Called when a remote or local notification is opened or received
        onNotification: function(notification) {
            console.log("NOTIFICATION:", notification);

            // process the notification
            console.log('Running Headless….');
            NativeModules.ActivityStarter.navigateToExample();
            // bgMessaging;

            // // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
            // notification.finish(PushNotificationIOS.FetchResult.NoData);
        },

        // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
        senderID: "657467070181",

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         */
        requestPermissions: true
    });


// this.pubnub = new PubNubReact({
//     publishKey: 'pub-c-68aadf74-e1e6-4cd5-897b-409ca1e1aacf',
//     subscribeKey: 'sub-c-dc2e961c-ed28-11e9-ba7f-428dd4590e3f'
// });
// this.pubnub.init(this);
// PushNotification.configure({
//     // Called when Token is generated.
//     onRegister: function(token) {
//         console.log( 'TOKEN:', token );
//         if (token.os == "ios") {
//             this.pubnub.push.addChannels(
//                 {
//                     channels: ['notifications'],
//                     device: token.token,
//                     pushGateway: 'apns'
//                 });
//             // Send iOS Notification from debug console: {"pn_apns":{"aps":{"alert":"Hello World."}}}
//         } else if (token.os == "android"){
//             this.pubnub.push.addChannels(
//                 {
//                     channels: ['notifications'],
//                     device: token.token,
//                     pushGateway: 'gcm' // apns, gcm, mpns
//                 });
//             // Send Android Notification from debug console: {"pn_gcm":{"data":{"message":"Hello World."}}}
//             console.log('Running Headless….');
//             NativeModules.ActivityStarter.navigateToExample();
//         }
//     }.bind(this),
//     // Something not working?
//     // See: https://support.pubnub.com/support/solutions/articles/14000043605-how-can-i-troubleshoot-my-push-notification-issues-
//     // Called when a remote or local notification is opened or received.
//     onNotification: function(notification) {
//         console.log( 'NOTIFICATION:', notification );
//         // Do something with the notification.
//         // Required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
//         // notification.finish(PushNotificationIOS.FetchResult.NoData);
//     },
//     // ANDROID: GCM or FCM Sender ID
//     senderID: "657467070181",
// });

// FileUtils.readFile("utils/PrivateKey").then(st => {
//     this.setState({
//                 isLoading: false,
//                 response: st}, function () {
//
//                 }
//             )
// });

// RSAUtils.encrypt("asaewssa").then(st => {
//     console.log(st);
//     this.setState({
//         isLoading: false,
//         response: readFile("utils/PrivateKey")}, function () {
//
//         }
//     )
// });

}

