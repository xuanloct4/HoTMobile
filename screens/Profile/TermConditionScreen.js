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

class TermConditionScreen extends React.Component {

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

                <TouchableHighlight
                    style={[styles.profileImgContainer, { borderColor: 'green', borderWidth:1 }]}
                >
                    <Image source={{ uri:"https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png" }} style={styles.profileImg} />
                </TouchableHighlight>
                <View style={styles.login}>
                    <CustomButton i18nKey={'login_button_title'}
                                  onPress={() => this.props.navigation.navigate('Home')}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default TermConditionScreen;
