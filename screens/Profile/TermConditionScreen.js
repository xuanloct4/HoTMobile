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
    Image, RefreshControl,
    ScrollView,
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {WebView} from 'react-native-webview';
import CustomButton from '../../components/CustomButton';
import CustomTextView from '../../components/CustomTextView';
import  CustomEditText from '../../components/CustomEditText'
import I18n from '../../i18n/i18n';

class TermConditionScreen extends React.Component {

    static navigationOptions = ({ screenProps: { i18n, language } }) => ({
        title: I18n.t('login_screen_title'),
    });

    constructor(props) {
        super(props);
        this.setState({loading: false, refresh: false});
    }

    handleRefresh() {
        console.log("Refreshed");
    }

    componentDidMount() {
        this.setState({loading: false, refresh: false});
    }

    render() {
        return (
        <WebView bounce={false}
                 source={{uri: 'https://github.com/facebook/react-native'}}
                 style={styles.webView}/>
        );
        // return (
        //         <ScrollView style={styles.container} refreshControl={ <RefreshControl
        //             refreshing={false}
        //             onRefresh={this.handleRefresh.bind(this)}/>}>
        //         <WebView bounce={false}
        //             source={{uri: 'https://github.com/facebook/react-native'}}
        //             style={styles.webView}/>
        //         </ScrollView>
        // );
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
