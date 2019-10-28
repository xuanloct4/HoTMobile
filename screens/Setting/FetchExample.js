import React from 'react';
import { FlatList, ActivityIndicator, AppState } from 'react-native';
import ApiUtils from '../../utils/ApiUtils'
import RSAUtils from '../../utils/RSAUtils';
import * as FileUtils from '../../utils/FileUtils';

import {
    View, Text, TouchableOpacity
} from 'react-native';
import CustomTextView from '../../components/CustomTextView';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';

import DefaultPreference from 'react-native-default-preference';


import type { RemoteMessage } from 'react-native-firebase';


class FetchExample extends React.Component {
    setLanguage = language => {
        this.setState({ language });
        this.props.setLanguage(language);
        // DefaultPreference.set('App Language', language).then(function() {console.log('Updated language:', language)});
    }

    static navigationOptions = ({ screenProps: { i18n, language } }) => ({
        title: i18n.t('fetch-page'),
    });

    constructor(props){
        super(props);
        this.state ={ isLoading: true};
        // DefaultPreference.set('my key', 'my value').then(function() {console.log('done')});

    }

    componentDidMount(){
        // AppState.addEventListener('change', this._handleAppStateChange);


        // return fetch('http://192.168.1.7/hot/public/api.php/board/activate', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //         'Chanel-Id': 0
        //     },
        //     body: JSON.stringify({
        //         board_id: 1,
        //         authorized_code: 'abc',
        //     }),
        // }).then((response) => { return response.json();})
        //     .then((responseJson) => {
        //
        //         this.setState({
        //             isLoading: false,
        //             dataSource: responseJson,
        //             response: JSON.stringify(responseJson)
        //         }, function(){
        //
        //         });
        //
        //     })
        //     .catch((error) =>{
        //         console.error(error);
        //     });
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        console.log(nextAppState);
        if (nextAppState.match(/inactive|background/)) {
            console.log('App State:', nextAppState);
            // this.props.navigation.navigate('Home');
        }



        // if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
        //     console.log('App has come to the foreground!');
        // }
        // this.setState({appState: nextAppState});
        // console.log(this.state.appState);
    };


    render(){
        const { language } = this.props;
        const isVNLang = language === 'vi' ? true : false;

        // if(this.state.isLoading){
        //     return(
        //         <View style={{flex: 1, padding: 20}}>
        //             <ActivityIndicator/>
        //         </View>
        //     )
        // }

        return(
            <View style={{flex: 1, paddingTop:20}}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <CustomTextView i18nKey={'this-is-home-page'}>This is home screen</CustomTextView>
                    <View style={{ flexDirection: 'row' }}>
                        <CustomTextView i18nKey={'set-language'}>Chọn ngôn ngữ</CustomTextView>
                        <TouchableOpacity onPress={() => this.setLanguage('vi')}
                                          style={{ marginLeft: 20 }}>
                            <Text style={{ color: isVNLang ? 'blue' : 'grey' }}>Việt Nam</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setLanguage('en')}
                                          style={{ marginLeft: 5 }}>
                            <Text style={{ color: !isVNLang ? 'blue' : 'grey' }}>England</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style=" padding: 10,fontSize: 18,height: 100">{this.state.response}</Text>

                {/*<FlatList*/}
                    {/*data={this.state.dataSource}*/}
                    {/*renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}*/}
                    {/*keyExtractor={({id}, index) => id}*/}
                {/*/>*/}
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(FetchExample);
