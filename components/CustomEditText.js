import { connect } from 'react-redux';
import I18n from '../i18n/i18n';
import React from 'react';
import {Button, AppState, TouchableOpacity, StyleSheet, TextInput, View} from 'react-native';
import CustomTextView from './CustomTextView';

class CustomEditText extends React.Component {

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
        const { i18nTitleKey, i18nMessageKey, i18nPlaceholderKey, secureTextEntry=false } = this.props;
        const { i18n } = this.state;
        return (
            <View
                style={styles.container}>

                <CustomTextView i18nKey={i18nTitleKey} style={styles.title}>
                </CustomTextView>

                <TextInput
                    style={styles.textfield}
                    value={this.state.text}
                    secureTextEntry={secureTextEntry}
                    placeholder={i18nPlaceholderKey ? i18n.t(i18nPlaceholderKey) : this.props.children}
                    onChangeText={(value) => this.setState({ text: value, isEditing: true })}
                    autoFocus
                    onBlur={() => this.setState({ isEditing: false })}/>

                    <CustomTextView i18nKey={i18nMessageKey} style={styles.message}>
                    </CustomTextView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // position: 'relative',
        // alignItems: 'flex-start',
        backgroundColor: '#ffffff',
    },
    title: {

        marginTop: 0,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 15,
        fontWeight: 'bold'
    },
    textfield: {
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 13,
        borderColor: '#999999',
        borderWidth: 1,
        borderRadius: 5,
        color:'#333333',
        height: 40
    },
    message: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 12,
        color: '#ff0000'
    },
});


const mapStateToProps = state => {
    return {
        language: state.languageReducer.language
    };
};

export default connect(mapStateToProps, null)(CustomEditText);
