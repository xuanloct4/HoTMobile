import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    StatusBar,
    SectionList,
    Alert, TouchableOpacity, Image, Picker,
} from 'react-native';
import I18n from '../../i18n/i18n';
// import connect from 'react-redux/es/connect/connect';
import {connect} from 'react-redux';
import * as actions from '../../redux/actions';
import CustomButton from '../../components/CustomButton';
import CustomTextView from '../../components/CustomTextView';
import DefaultPreference from 'react-native-default-preference';
import DataManager from '../../app_data/DataManager';

class SplashScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            i18n: I18n,
        };
    }

    componentDidMount() {
        // const { language } = this.props;
        // if (language) {
        //     this.setMainLocaleLanguage(language);
        // } else {
        DefaultPreference.get('App Language').then((language) => {
            console.log('Get language:', language);
            let appLanaguage = language;
            if (language == null) {
                appLanaguage = "vi";
            }
            this.setLanguage(appLanaguage);

            let json = new Object();
            json.token = "bTAZS1IZvpjmRqYMUUvafSBm09xtnicGE8RMPg8W1VhLDd2UDE6vcQJC97QaBblW";
            json.expired_interval = 7776000;
            json.number_of_valid_access = 1;

            DefaultPreference.set('Authorization', JSON.stringify(json)).then(function() {
                DefaultPreference.get('Authorization').then((a) => {
                    console.log("Save Authorization: ", a);
                });
            });

            DefaultPreference.get('Authorization').then((auth) => {
                console.log('Authorization: ', auth);
                if (auth) {
                    let token = JSON.parse(auth).token;
                    console.log('Token: ', token);
                    if (token) {
                        DataManager.getInstance().storeKeyValue('token', token);
                        setTimeout(() => {
                            this.goHome();
                        }, 2000);
                    } else {
                        setTimeout(() => {
                            this.goLogin();
                        }, 1000);
                    }
                } else {
                    setTimeout(() => {
                        this.goLogin();
                    }, 1000);
                }
            });
        });
    }

    goHome() {
        this.props.navigation.navigate('Home', {screenProps: {i18n: this.state.i18n, locale: this.state.language}});
    }

    goLogin() {
        this.props.navigation.navigate('Auth', {screenProps: {i18n: this.state.i18n, locale: this.state.language}});
    }

    setMainLocaleLanguage = language => {
        let i18n = this.state.i18n;
        i18n.locale = language;
        // this.setState({ i18n });
        // this.setState({ language });
        this.setState({i18n: i18n, language: language});
    };

    setLanguage = language => {
        this.setMainLocaleLanguage(language);
        this.props.setLanguage(language);
        DefaultPreference.set('App Language', language).then(function () {
            console.log('Updated language:', language);
        });
    };

    render() {
        // const { language } = this.props;
        console.log(this.state.language);
        const isVNLang = this.state.language === 'vi' ? true : false;
        return (
            <View style={styles.container}>
                {/*<CustomButton i18nKey={'set-language'} onPress={() => this.setLanguage('vi')}/>*/}
                {/*<Image style={styles.image}*/}
                {/*source={require('../../assets/images/ic_reveal.png')}/>*/}

                <CustomTextView i18nKey={'this-is-home-page'}>This is home screen</CustomTextView>
                <View style={{flexDirection: 'row'}}>
                    <CustomTextView i18nKey={'set-language'}>Chọn ngôn ngữ</CustomTextView>
                    <TouchableOpacity onPress={() => this.setLanguage('vi')}
                                      style={{marginLeft: 20}}>
                        <Text style={{color: isVNLang ? 'blue' : 'grey'}}>Việt Nam</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setLanguage('en')}
                                      style={{marginLeft: 5}}>
                        <Text style={{color: !isVNLang ? 'blue' : 'grey'}}>England</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.goLogin.bind(this)}
                                      style={{marginLeft: 20}}>
                        <Text style={{color: isVNLang ? 'blue' : 'grey'}}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
    },
});

const mapStateToProps = state => {
    return {
        language: state.languageReducer.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setLanguage: language => {
            dispatch(actions.changeLanguage(language));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
