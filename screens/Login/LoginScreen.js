import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    StatusBar,
    TouchableHighlight,
    Image, NativeModules, Platform,
} from 'react-native';
import {StackNavigator} from 'react-navigation';

import CustomButton from '../../components/CustomButton';
import CustomTextView from '../../components/CustomTextView';
import CustomEditText from '../../components/CustomEditText';
import API from '../../api/API';
import RSAUtils from '../../utils/RSAUtils';
import DateTimePickerModel from '../Setting/DateTimePickerModel';
import DefaultPreference from 'react-native-default-preference';
import Loader from '../../components/Loader';
import DataManager from '../../app_data/DataManager';
import I18n from '../../i18n/i18n';
import ActivityStarter from '../../native_modules/ActivityStarter';
import PushNotification from '../../services/PushNotification';

class LoginScreen extends React.Component {

    static navigationOptions = ({screenProps: {i18n, locale}}) => ({
        title: I18n.t('login_screen_title'),
    });

    username;
    password;
    navigation;

    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;

        // ActivityStarter.getDeviceName((info) => {
        //     console.log('getDeviceName', info);
        //     this.state.deviceInfo = ({deviceName: info});
        // });
        // ActivityStarter.getSerialNumber((info) => {
        //     console.log('getSerialNumber', info);
        //     this.state.deviceInfo = ({serialNumber: info});
        // });
        // ActivityStarter.getFirmwareVersion((info) => {
        //     console.log('getFirmwareVersion', info);
        //     this.state.deviceInfo = ({firmwareVersion: info});
        // });
        // ActivityStarter.getDeviceId((info) => {
        //     console.log('getDeviceId', info);
        //     this.state.deviceInfo = ({deviceId: info});
        // });
        // ActivityStarter.getOSVersion((info) => {
        //     console.log('getOSVersion', info);
        //     this.state.deviceInfo = ({osVersion: info});
        // });
        // ActivityStarter.getDeviceDes((info) => {
        //     console.log('getDeviceDes', info);
        //     this.state.deviceInfo = ({deviceDes: info});
        // });
        // ActivityStarter.getOSName((info) => {
        //     console.log('getOSName', info);
        //     this.state.deviceInfo = ({osName: info});
        // });
        // ActivityStarter.getIPAddress((info) => {
        //     console.log('getIPAddress', info);
        //     this.state.deviceInfo = ({ipAddress: info});
        // });
    }

    UNSAFE_componentWillMount() {
        this.setState({popoverIsOpen: false, loading: false});
    }

    callLoginAPI = (usrname, passwordEn) => {
        let body = new Object();
        body.uuid = usrname;
        body.authorized_code = passwordEn;
        API.fetchAPI(this.onSuccess.bind(this), this.onError.bind(this), API.url.USER_AUTHORIZE, body, {}, API.httpMethods.POST, API.baseURL.hot);
    };

    logCallback = (en) => {
        this.callLoginAPI(this.username, en);
    };

    login() {
        this.setState({loading: true, usernameErrorKey: '', passwordErrorKey: ''});
        if (Platform.OS === 'android') {
            ActivityStarter.encryptRSA(this.password, DataManager.getInstance().pubkeyRSATrimmed, this.logCallback);
        } else {
            RSAUtils.encrypt(this.password)
                .then((en) => {
                    this.callLoginAPI(this.username, en);
                });
        }
    }

    goToHome() {
        this.setState({loading: false});
        this.navigation.navigate('Home', {screenProps: {i18n: this.state.i18n, locale: this.state.language}});
    };

    onSuccess(json) {
        console.log('Success');
        DataManager.getInstance().storeKeyValue('Authorization', json);

        // let body = new Object();
        // API.fetchAPI(this.onUserActivateSuccess.bind(this), this.onUserActivateError.bind(this), API.url.USER_ACTIVATE, body, {}, API.httpMethods.POST, API.baseURL.hot);
        this.updateRegistrationToken();
    }

    onError(error) {
        this.setState({loading: false, usernameErrorKey: '', passwordErrorKey: 'wrong_username_or_password'});
    }

    onRegisterSuccess(json) {
        let auth = DataManager.getInstance().valueForKey('Authorization');
        DefaultPreference.set('Authorization', auth).then(() => {
            console.log('Save Authorization: ', auth);
            let ob = JSON.parse(json);
            if (ob && ob.id) {
                DefaultPreference.set('Device ID', ob.id).then(() => {
                    console.log('Save Device ID: ', ob.id);
                    this.goToHome();
                });
            } else {
                this.goToHome();
            }
        });
    }

    onRegisterError(error) {
        this.setState({loading: false});
        Alert.alert(
            I18n.t('delete_error_alert_title'),
            I18n.t('delete_error_alert_message'),
            [
                {
                    text: I18n.t('OK'),
                    onPress: () => {
                    },
                },
            ],
            {cancelable: true},
        );
    }

    onUserActivateSuccess(json) {
        this.setState({loading: false});

        this.updateRegistrationToken();
    }

    onUserActivateError(error) {
        this.setState({loading: false});
        // Alert.alert(
        //     I18n.t('delete_error_alert_title'),
        //     I18n.t('delete_error_alert_message'),
        //     [
        //         {
        //             text: I18n.t('OK'),
        //             onPress: () => {
        //             },
        //         },
        //     ],
        //     {cancelable: true},
        // );

        this.updateRegistrationToken();
    }


    updateRegistrationToken = () => {
        DefaultPreference.get('Device Token').then((token) => {
            console.log('Get Device Token:', token);

            DefaultPreference.get('Device ID').then((deviceID) => {
                console.log('Get Device ID:', deviceID);
                let query = {};
                if (token != null && token !== '') {
                    query.push_registration_token = token;
                }
                if (deviceID != null && deviceID !== '') {
                    query.id = deviceID;
                }

                ActivityStarter.getDeviceName((deviceName) => {
                    ActivityStarter.getDeviceDes((deviceDes) => {
                        ActivityStarter.getSerialNumber((serialNumber) => {
                            ActivityStarter.getOSVersion((osVersion) => {
                                ActivityStarter.getOSName((osName) => {
                                    ActivityStarter.getFirmwareVersion((firmwareVersion) => {
                                        ActivityStarter.getDeviceId((id) => {
                                            query.name = deviceName;
                                            query.description = deviceDes;
                                            query.model = id;
                                            query.manufacturer = serialNumber;
                                            query.version = osVersion;
                                            query.os = osName;
                                            query.firmware = firmwareVersion;

                                            API.fetchAPI(this.onRegisterSuccess.bind(this), this.onRegisterError.bind(this), API.url.USER_REGISTER_DEVICE, query, {}, API.httpMethods.POST, API.baseURL.hot);


                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    };

    onUsernameUpdate(text) {
        this.username = text;
    }

    onPasswordUpdate(text) {
        this.password = text;
    }

    render() {
        return (
            <View style={styles.container}>
                <Loader
                    loading={this.state.loading}/>
                <View style={styles.username}>
                    <CustomEditText i18nTitleKey={'username_title'} i18nMessageKey={this.state.usernameErrorKey}
                                    i18nPlaceholderKey={'username_placeholder'}
                                    onTextChanged={(text) => this.onUsernameUpdate(text)}/>
                </View>
                <View style={styles.password}>
                    <CustomEditText secureTextEntry={true} i18nTitleKey={'password_title'}
                                    i18nMessageKey={this.state.passwordErrorKey}
                                    i18nPlaceholderKey={'password_placeholder'}
                                    onTextChanged={(text) => this.onPasswordUpdate(text)}/>
                </View>

                <View style={styles.button}>
                    <CustomButton i18nKey={'login_button_title'}
                                  onPress={this.login.bind(this)}/>
                </View>
            </View>
        );
    }

    // render() {
    //     const {navigate} = this.props.navigation;
    //     return (
    //         <Button
    //             title="Go to Jane's profile"
    //             onPress={() => navigate('Profile', {name: 'Jane'})}
    //         />
    //     );
    // }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    username: {
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 15,
        // position: 'relative',
    },
    password: {
        marginTop: 0,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30,
    },
    button: {
        justifyContent: 'center',
        backgroundColor: '#000068',
        borderColor: '#000080',
        borderWidth: 1,
        borderRadius: 15,
        position: 'absolute',
        height: 30,
        bottom: 20,
        left: 20,
        right: 20,
        overflow: 'hidden',
    },
    profileImgContainer: {
        marginLeft: 8,
        height: 82,
        width: 82,
        borderRadius: 82 / 2,
        borderWidth: 1,
    },
    profileImg: {
        height: 80,
        width: 80,
        borderRadius: 80 / 2,
        overflow: 'hidden',
    },
});

export default LoginScreen;
