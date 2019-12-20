/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import AppNavigator from './stacks/AppNavigator';
import {createAppContainer} from 'react-navigation';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import DefaultPreference from 'react-native-default-preference';
import * as actions from './redux/actions';

import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import appReducers from './redux/reducers';
import I18n from './i18n/i18n';

export const store = createStore(
    appReducers
)

class App extends React.Component {

    // state = {
    //     locale: Localization.locale,
    // };
    //
    // setLocale = locale => {
    //     this.setState({ locale });
    // };
    //
    // t = (scope, options) => {
    //     return i18n.t(scope, { locale: this.state.locale, ...options });
    // };

    constructor(props) {
        super(props);


        // I18n.locale = 'vi'
        this.state = {
            i18n: I18n
        };


        // DefaultPreference.get('App Language').then(language => {
        //   console.log(language);
        //     this.setState({ language: language });
        // });
    }


    UNSAFE_componentWillMount() {
        const { language } = this.state;
        if (language) this.setMainLocaleLanguage(language);
    }

    componentDidMount() {
        const { language } = this.state;
        if (language) this.setMainLocaleLanguage(language);
    }

    setMainLocaleLanguage = language => {
        let i18n = this.state.i18n;
        i18n.locale = language;
        this.setState({ i18n });
        this.props.setLanguage(language);
    }

    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <ConnectedRoot screenProps={{
                        i18n: this.state.i18n,
                        language: this.state.language,
                    }}/>
                </View>
            </Provider>
        );
    }
}



const mapStateToProps = state => {
    return {
        language: state.languageReducer.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setLanguage: language => {
            dispatch(actions.changeLanguage(language));
        }
    }
}

const ConnectedRoot = connect(mapStateToProps, mapDispatchToProps)(AppNavigator);

const styles = StyleSheet.create({
    app: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c2ffd2',
    },
    content: {
        padding: 16,
        backgroundColor: 'pink',
        borderRadius: 8,
    },
    arrow: {
        borderTopColor: 'pink',
    },
    background: {
        backgroundColor: 'rgba(0, 0, 255, 0.5)'
    },
});

export default App;
