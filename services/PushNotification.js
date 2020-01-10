import {AppState, NativeModules, Platform} from 'react-native';
// import { PushNotificationIOS } from "react-native";
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PubNubReact from 'pubnub-react';
import type {RemoteMessage} from 'react-native-firebase';
import API from '../api/API';
import DefaultPreference from 'react-native-default-preference';

export default async () => {
    var PushNotification = require('react-native-push-notification');

    if (Platform.OS === 'ios') {
        PushNotificationIOS.addEventListener('register', (token) => {
            this.setState({
                deviceToken: token,
            });
        });

        PushNotificationIOS.addEventListener('registrationError', (registrationError) => {
            console.log('was error');
            console.log(registrationError.message);
            console.log(registrationError.code);
            console.log(registrationError.details);
        });

// yes I'm aware I've added an event listener in the constructor also. Neither of these callbacks fire
        PushNotificationIOS.addEventListener('register', (token) => {
            console.log('this is the token', token);
        });

        // console.log('requesting permissions');
        // PushNotificationIOS.requestPermissions();
    }

    PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token) {
            DefaultPreference.set('Device Token', token.token).then(function () {
                console.log('Save Device Token: ', token);
            });
        },

        // (required) Called when a remote or local notification is opened or received
        onNotification: function (notification) {
            console.log('NOTIFICATION:', notification);

            // process the notification
            console.log('Running Headless….');
            // NativeModules.ActivityStarter.navigateToExample();
            // bgMessaging;

            // // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
            // notification.finish(PushNotificationIOS.FetchResult.NoData);
        },

        // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
        senderID: '657467070181',

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         */
        requestPermissions: true,
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

