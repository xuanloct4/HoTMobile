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
import  CustomEditText from '../../components/CustomEditText'
import I18n from '../../i18n/i18n';
import DataManager from '../../app_data/DataManager';

class AboutScreen extends React.Component {

    static navigationOptions = ({ screenProps: { i18n, language } }) => ({
        title: I18n.t('About'),
    });

    constructor(props) {
        super(props);
        this.state = {loading: false, refresh: true};
    }


    UNSAFE_componentWillMount() {
    }

    componentDidMount() {
    }

    render() {
        DataManager.getInstance().storeKeyValue("app-version", "1.0.0");
        let version = I18n.t('about_app_version') + ' ' + DataManager.getInstance().valueForKey("app-version");

        return (
            <View style={styles.container}>
                <Text style={styles.appVersion}>{version}</Text>
                <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
                <CustomTextView style={styles.copyright} i18nKey={"copyright"}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    appVersion: {
        left: 10,
        right: 10,
        height: 60,
        textAlignVertical: 'center',
        fontSize: 18,
        color: '#333333',
    },
    copyright: {
        left: 10,
        right: 10,
        height: 50,
        textAlignVertical: 'center',
        fontSize: 15,
        color: 'rgba(50,50,247,1.0)',
    },
});

export default AboutScreen;
