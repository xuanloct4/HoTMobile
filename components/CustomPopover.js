import React, { Component } from 'react';
import Popover from 'react-native-popover-view';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';

export default class CustomPopover extends Component {
    state = {
        isVisible: false
    }

    showPopover() {
        this.setState({isVisible: true});
    }

    closePopover() {
        this.setState({isVisible: false});
    }

    render() {
        const {} = this.props;
         return (
            <View style={styles.container}>
                <Popover
                    isVisible={this.state.isVisible}
                    fromView={this.touchable}
                    onRequestClose={() => this.closePopover()}>
                </Popover>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(43, 186, 180)',
    },
    button: {
        borderRadius: 4,
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#ccc',
        borderColor: '#333',
        borderWidth: 1,
    }
});
