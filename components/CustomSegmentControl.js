import { connect } from 'react-redux';
import I18n from '../i18n/i18n';
import React from 'react';
import {Button, AppState, TouchableOpacity, StyleSheet, Text, View} from 'react-native';

class CustomSegmentControl extends React.Component {

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
        const { i18nKey, enable = true, onSegmentChange, backgroundColor, selectedColor, disableSelectedColor, style = {}, textStyle = {}} = this.props;
        const { i18n } = this.state;
        return (
            <View style={styles.segmentSelection}>
                <View style={styles.selectAllButton}>
                    {/*<Button title='Chuông và thông báo' > </Button>*/}
                    <TouchableOpacity>
                        <Text style={{  height: '100%', width: '100%', fontSize: 10, textAlign: 'center', textAlignVertical: 'center'}}>Chuông và thông báo</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.unselectButton}>
                    {/*<Button title='Chỉ chuông' > </Button>*/}
                    <TouchableOpacity>
                        <Text style={{ height: '100%', width: '100%', fontSize: 10, textAlign: 'center', textAlignVertical: 'center'}}>Chỉ chuông</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.thirdButton}>
                    {/*<Button title='Chỉ thông báo'> </Button>*/}
                    <TouchableOpacity>
                        <Text style={{  height: '100%', width: '100%', fontSize: 10, textAlign: 'center', textAlignVertical: 'center'}}>Chỉ thông báo</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
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

export default connect(mapStateToProps, null)(CustomSegmentControl);
