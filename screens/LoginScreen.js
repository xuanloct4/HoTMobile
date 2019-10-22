import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    StatusBar,
} from 'react-native';
import {StackNavigator} from 'react-navigation';

import CustomButton from '../components/CustomButton';
import CustomTextView from '../components/CustomTextView';
import  CustomEditText from '../components/CustomEditText'

class LoginScreen extends React.Component {

    static navigationOptions = ({ screenProps: { i18n, language } }) => ({
        title: i18n.t('login_screen_title'),
    });

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.username}>
                <CustomEditText  i18nTitleKey={'username_title'} i18nMessageKey={'username_title'} i18nPlaceholderKey={'username_placeholder'}/>
            </View>
                <View style={styles.password}>
                <CustomEditText secureTextEntry={true} i18nTitleKey={'password_title'} i18nMessageKey={'password_title'} i18nPlaceholderKey={'password_placeholder'}/>
                </View>
                <View style={styles.login}>
                <CustomButton i18nKey={'login_button_title'}
                    onPress={() => this.props.navigation.navigate('Home')}/>
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
        marginTop : 30,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 15,
        // position: 'relative',
    },
    password: {
        marginTop : 0,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30,
    },
    login: {
        position: 'absolute',
        left: 20,
        right: 20,
        bottom: 20,
    },
});


export default LoginScreen;
