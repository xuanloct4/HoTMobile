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
    Image,
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

class LoginScreen extends React.Component {


    static navigationOptions = ({screenProps: {i18n, locale}}) => ({
        title: i18n.t('login_screen_title'),
    });

    username;
    password;
    navigation;

    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
    }

    UNSAFE_componentWillMount() {
        this.setState({popoverIsOpen: false,loading: false});
    }

    login() {
        this.setState({loading: true, usernameErrorKey: '', passwordErrorKey : ''});
        // fetchAPI(onSuccess, onError, url, bodyObject, additionalHeaders, method=API.httpMethods.GET, baseURL= API.baseURL.hot)

        //TODO test only
        var t = RSAUtils.encrypt("def")
        // var t = RSAUtils.encrypt(this.password)
            .then((en) => {
            let passEncrypted = "g1mj0lypTdtr1LEJnWdR2Kcvli1zZh/CmCgWJXFjOjepv7D3FAMQ9XVgrld7vRWEyawPKkhkzlnEtL2d0YoeGrD6EaUdP2WlXXTM7U8JO0s9bGv4Sw44KDX6J7STw6iOOMJl9hcL9uOQZKgM/0J0/qmrWE8mTB9Sm3aokmRo3PVmcdbVTVJJiYKIqOgm0CmeuQpo+yRkpTDyhd21R2pWvB5S8wX2MgJPohdrAvDJXmDEgOLqyug9fqFxt5X98+p0o9WkdKxSpOeq+m8S3Bbb8KakHNox5o2vvq48A4tAOjID2V/izyzQ3JJ0tHWmfH5bWmyy9OS3iJHffiiNXzD4nD0QL54niooWLLXXT3Ic7rIhWzJ5jnBX/MvDMenQPP6YsbgiziLcdEk8LjIIYMJ8uMIErHdDqjR/vnFSvJ8S7k5OY4AcivUWeoIvHHNcBRZAa/CzA+bD6rtaj6a/C3Z5JtRcwprr3W/wjjkbaahTBXaMAgQlTP+CPGZArjGCkpYA3O60qLvZ95bQg0xSRWC4sTrj2iiK7loeAEtKYDxvS5JIqlFJ/VZ5Regg2Gn8AAx0xWSA+TihoN2soHyBnu4z4ofk73QRwBwVJCSyZ8Tl12A46a7/4tY80SfZuaooIcY/qMAV8EqOHfv6cKOhJluJ5ZxwQik3v6NbuYQ46SFUFmw=";
            let body = new Object();

            //TODO test only
            // body.uuid = "2";
            body.uuid = this.username;

            body.authorized_code = en;
            API.fetchAPI(this.onSuccess.bind(this), this.onError.bind(this), API.url.USER_AUTHORIZE, body, {}, API.httpMethods.POST, API.baseURL.hot);
        });
    }

    goHome() {
        this.setState({loading: false});
        this.navigation.navigate('Home');
        return;
    }

    onSuccess(json) {
        console.log("Success");
        console.log(json);
        global.Authorization = json;
        DefaultPreference.set('Authorization', JSON.stringify(json)).then(function() {
            DefaultPreference.get('Authorization').then((a) => {
                console.log("Save Authorization: ", a);
            });
        });


       this.goHome();
    }

    onError(error) {
        this.setState({loading: false, usernameErrorKey: '', passwordErrorKey : 'wrong_username_or_password'});
    }

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
                                    i18nMessageKey={this.state.passwordErrorKey} i18nPlaceholderKey={'password_placeholder'}
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
