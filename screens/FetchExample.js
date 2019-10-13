import React from 'react';
import { FlatList, ActivityIndicator, Text, View, AppState } from 'react-native';
import ApiUtils from '../utils/ApiUtils'
import RSAUtils from '../utils/RSAUtils';
import * as FileUtils from '../utils/FileUtils';

import PushNotificationIOS from 'react-native';
import PubNubReact from 'pubnub-react';
var PushNotification = require('react-native-push-notification');

export default class FetchExample extends React.Component {


    static navigationOptions = {
        title: 'FetchExample',
    };

    constructor(props){
        super(props);
        this.state ={ isLoading: true};
    }

    componentDidMount(){
        AppState.addEventListener('change', this._handleAppStateChange);

        // var PushNotification = require("react-native-push-notification");
        //
        // PushNotification.configure({
        //     // (optional) Called when Token is generated (iOS and Android)
        //     onRegister: function(token) {
        //         console.log("TOKEN:", token);
        //     },
        //
        //     // (required) Called when a remote or local notification is opened or received
        //     onNotification: function(notification) {
        //         console.log("NOTIFICATION:", notification);
        //
        //         // process the notification
        //
        //         // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
        //         notification.finish(PushNotificationIOS.FetchResult.NoData);
        //     },
        //
        //     // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
        //     senderID: "657467070181",
        //
        //     // IOS ONLY (optional): default: all - Permissions to register.
        //     permissions: {
        //         alert: true,
        //         badge: true,
        //         sound: true
        //     },
        //
        //     // Should the initial notification be popped automatically
        //     // default: true
        //     popInitialNotification: true,
        //
        //     /**
        //      * (optional) default: true
        //      * - Specified if permissions (ios) and token (android and ios) will requested or not,
        //      * - if not, you must call PushNotificationsHandler.requestPermissions() later
        //      */
        //     requestPermissions: true
        // });


        this.pubnub = new PubNubReact({
            publishKey: 'pub-c-68aadf74-e1e6-4cd5-897b-409ca1e1aacf',
            subscribeKey: 'sub-c-dc2e961c-ed28-11e9-ba7f-428dd4590e3f'
        });
        this.pubnub.init(this);
        PushNotification.configure({
            // Called when Token is generated.
            onRegister: function(token) {
                console.log( 'TOKEN:', token );
                if (token.os == "ios") {
                    this.pubnub.push.addChannels(
                        {
                            channels: ['notifications'],
                            device: token.token,
                            pushGateway: 'apns'
                        });
                    // Send iOS Notification from debug console: {"pn_apns":{"aps":{"alert":"Hello World."}}}
                } else if (token.os == "android"){
                    this.pubnub.push.addChannels(
                        {
                            channels: ['notifications'],
                            device: token.token,
                            pushGateway: 'gcm' // apns, gcm, mpns
                        });
                    // Send Android Notification from debug console: {"pn_gcm":{"data":{"message":"Hello World."}}}
                }
            }.bind(this),
            // Something not working?
            // See: https://support.pubnub.com/support/solutions/articles/14000043605-how-can-i-troubleshoot-my-push-notification-issues-
            // Called when a remote or local notification is opened or received.
            onNotification: function(notification) {
                console.log( 'NOTIFICATION:', notification );
                // Do something with the notification.
                // Required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
                // notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            // ANDROID: GCM or FCM Sender ID
            senderID: "657467070181",
        });

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


        // return fetch('http://192.168.1.7/hot/public/api.php/board/activate', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //         'Chanel-Id': 0
        //     },
        //     body: JSON.stringify({
        //         board_id: 1,
        //         authorized_code: 'abc',
        //     }),
        // }).then((response) => { return response.json();})
        //     .then((responseJson) => {
        //
        //         this.setState({
        //             isLoading: false,
        //             dataSource: responseJson,
        //             response: JSON.stringify(responseJson)
        //         }, function(){
        //
        //         });
        //
        //     })
        //     .catch((error) =>{
        //         console.error(error);
        //     });
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        console.log(nextAppState);
        if (nextAppState.match(/inactive|background/)) {
            console.log('App State:', nextAppState);
            this.props.navigation.navigate('Home');

            var SendIntentAndroid = require('react-native-send-intent');
            //
            // SendIntentAndroid.sendText({
            //     title: 'Please share this text',
            //     text: 'Lorem ipsum dolor sit amet, per error erant eu, antiopam intellegebat ne sed',
            //     type: SendIntentAndroid.TEXT_PLAIN
            // });

            // SendIntentAndroid.openApp('com.hotmobile').then((wasOpened) => {});

            // // You can also specify arbitrary intent extras to be passed to the app
            // SendIntentAndroid.openApp('com.hotmobile', {"com.mycorp.myapp.reason": "just because", "com.mycorp.myapp.data": "must be a string"}).then((wasOpened) => {});

            // SendIntentAndroid.sendPhoneCall('+55 48 9999-9999', true);
            SendIntentAndroid.sendPhoneDial('+55 48 9999-9999', false);

            // SendIntentAndroid.openAppWithData("com.mxtech.videoplayer.ad",
            //     "http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_surround-fix.avi",
            //     "video/*", {
            //         position: { type: "int", value: 60 }
            //     }
            // ).then((wasOpened) => {});
        }



        // if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
        //     console.log('App has come to the foreground!');
        // }
        // this.setState({appState: nextAppState});
        // console.log(this.state.appState);
    };


    render(){

        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return(
            <View style={{flex: 1, paddingTop:20}}>
                <Text style=" padding: 10,fontSize: 18,height: 100">{this.state.response}</Text>

                {/*<FlatList*/}
                    {/*data={this.state.dataSource}*/}
                    {/*renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}*/}
                    {/*keyExtractor={({id}, index) => id}*/}
                {/*/>*/}
            </View>
        );
    }
}
