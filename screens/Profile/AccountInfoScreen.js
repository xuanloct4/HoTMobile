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
    Image, TouchableOpacity, SectionList, RefreshControl,
} from 'react-native';
import {StackNavigator} from 'react-navigation';

import CustomButton from '../../components/CustomButton';
import CustomTextView from '../../components/CustomTextView';
import CustomEditText from '../../components/CustomEditText';
import DTComponent from '../Setting/DTComponent';
import DateTimePickerModel from '../Setting/DateTimePickerModel';
import Loader from '../../components/Loader';
import I18n from '../../i18n/i18n';
import API from '../../api/API';

class ListItem extends React.Component {
    render() {
        const {label, value, onPress} = this.props;
        return (
            <View style={listItemStyles.itemStyle}>
                <Text style={listItemStyles.leftIconStyle} numberOfLines={1}>{label}</Text>
                <View style={listItemStyles.rightIconStyle}>
                    <TouchableOpacity onPress={onPress}>
                        <Text style={listItemStyles.sectionRightTextStyle} numberOfLines={1}>{value}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const listItemStyles = StyleSheet.create({
    sectionRightTextStyle: {
        textAlign: 'right',
        textAlignVertical: 'center',
        fontSize: 15,
        color: 'rgba(50,50,247,1.0)',
    },
    itemStyle: {
        height: 44,
        justifyContent: 'center',
    },
    leftIconStyle: {
        position: 'absolute',
        left: 15,
        width: 150,
        height: 30,
        color: '#333333',
    },
    rightIconStyle: {
        position: 'absolute',
        right: 15,
        left: 100,
        height: 30,
    },
});


class AccountInfoScreen extends React.Component {

    static navigationOptions = ({ screenProps: { i18n, language } }) => ({
        title: I18n.t('Profile'),
    });

    constructor(props) {
        super(props);
        this.state = {ds: [], loading: false, refresh: true};
    }


    UNSAFE_componentWillMount() {
        this.setState({popoverIsOpen: false});
    }

    componentDidMount() {
        // const {language} = this.props;
        // if (language) this.setMainLocaleLanguage(language);
        console.log('Props: ', this.prop);
        this.fetchUserInfo();
    }

    fetchUserInfo() {
        this.setState({loading: false, refresh: true});
        API.fetchAPI(this.onSuccess.bind(this), this.onError.bind(this), API.url.USER, {}, {}, API.httpMethods.GET, API.baseURL.hot);
    }

    handleRefresh() {
        this.fetchUserInfo();
    }

    onSuccess(json) {
        console.log('Success');
        let userInfo = JSON.parse(json);
        let info = [{indexPath: {section: 0, row: 0}, info: {'key': "Name", 'value': userInfo.name}},
            {indexPath: {section: 0, row: 1}, info: {'key': "Address", 'value': userInfo.address}},
            {indexPath: {section: 0, row: 2}, info: {'key': "Location", 'value': userInfo.location}},
            {indexPath: {section: 0, row: 3}, info: {'key': "Phone", 'value': userInfo.phone}},
            {indexPath: {section: 0, row: 4}, info: {'key': "Gender", 'value': userInfo.gender}},
            {indexPath: {section: 0, row: 5}, info: {'key': "Status", 'value': userInfo.status}}];
        let ds = [
            {
                title: 'Includes',
                data: info,
            },
        ];

        this.setState({ds: ds, loading: false, refresh: false});
    }

    onError(error) {
        this.setState({ds: ds, loading: false, refresh: false});
        // this.setState({loading: false, usernameErrorKey: '', passwordErrorKey : 'wrong_username_or_password'});
    }

    FlatListItemSeparator = () => {
        return (
            //Item Separator
            <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
        );
    };

    setPopoverIsOpen = (isOpen) => {
        // this.state = {popoverIsOpen: {isOpen}};
        this.setState({popoverIsOpen: isOpen});
    };

    render() {
        const {ds} = this.state;
        console.log(JSON.stringify(this.state.ds));
        return (
            <View style={homeStyles.container}>
                <Loader
                    loading={this.state.loading}/>
                <SectionList
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    sections={ds}
                    renderItem={({item, section}) => <ListItem label={item.info.key}
                                                               value={item.info.value}/>}
                    keyExtractor={(item, index) => index}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refresh}
                            onRefresh={this.handleRefresh.bind(this)}/>
                    }
                    extraData={this.state.refreshing}/>

            </View>
        );
    }
}

const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    sectionHeader: {
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    segmentSelection: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 35,
        backgroundColor: '#eeeeee',
    },
    selectAllButton: {
        flex: 3,
        borderWidth: 1,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderColor: '#333333',
        backgroundColor: '#0088ff',
    },
    unselectButton: {
        flex: 3,
        borderWidth: 1,
        borderColor: '#333333',
    },
    buttonText: {
        overflow: 'hidden',
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#ffffff',
    },
    button: {
        justifyContent: 'center',
        backgroundColor: '#000068',
        borderColor: '#000080',
        borderWidth: 1,
        borderRadius: 28,
        position: 'absolute',
        height: 56,
        width: 56,
        bottom: 20,
        right: 10,
    },
});

export default AccountInfoScreen;
