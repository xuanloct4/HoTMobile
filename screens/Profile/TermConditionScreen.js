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
    WebView
} from 'react-native';
import {StackNavigator} from 'react-navigation';

import CustomButton from '../../components/CustomButton';
import CustomTextView from '../../components/CustomTextView';
import  CustomEditText from '../../components/CustomEditText'

class TermConditionScreen extends React.Component {

    static navigationOptions = ({ screenProps: { i18n, language } }) => ({
        title: i18n.t('login_screen_title'),
    });

    render() {
        return (
            <View style={styles.container}>
                <WebView
                    source={{uri: 'https://github.com/facebook/react-native'}}
                    style={styles.webView}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webView: {
        marginTop: 10,
        marginBottom: 10,
    },
});

export default TermConditionScreen;
