import React from 'react';
import {Text, View} from 'react-native';

class DetailsScreen extends React.Component {
    static navigationOptions = {
        title: 'Details',
    };

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Details!</Text>
            </View>
        );
    }
}

export default DetailsScreen;
