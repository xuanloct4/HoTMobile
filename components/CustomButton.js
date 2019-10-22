import { connect } from 'react-redux';
import I18n from '../i18n/i18n';
import React from 'react';
import {Button, AppState, TouchableOpacity, StyleSheet, Text} from 'react-native';

class CustomButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            i18n: I18n
        };
    }

    componentDidMount() {
        const { language } = this.props;
        if (language) this.setMainLocaleLanguage(language);
    }

    // componentWillReceiveProps = nextProps => {
    //     const { language } = nextProps;
    //     if (language) this.setMainLocaleLanguage(language);
    // }

    setMainLocaleLanguage = language => {
        let i18n = this.state.i18n;
        i18n.locale = language;
        this.setState({ i18n });
    }

    render() {
        const { i18nKey, onPress, color, title = 'Enter', style = {}, textStyle = {}} = this.props;
        const { i18n } = this.state;
        return (
            <Button onPress={onPress} title={i18nKey ? i18n.t(i18nKey) : this.props.children} color={color}>
            </Button>
        );
        // return (
        //     <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
        //         <Text style={[styles.text, textStyle]}>{i18nKey ? i18n.t(i18nKey) : this.props.children}</Text>
        //     </TouchableOpacity>
        // );
    }
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#2AC062',
        shadowColor: '#2AC062',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
    },

    text: {
        fontSize: 16,
        textTransform: 'uppercase',
        color: '#FFFFFF',
    },
});

const mapStateToProps = state => {
    return {
        language: state.languageReducer.language
    };
};

export default connect(mapStateToProps, null)(CustomButton);
