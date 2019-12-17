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
    Image, TouchableOpacity, SectionList, RefreshControl, Platform, TouchableNativeFeedback,
} from 'react-native';
import {StackNavigator} from 'react-navigation';

import CustomButton from '../../components/CustomButton';
import CustomTextView from '../../components/CustomTextView';
import  CustomEditText from '../../components/CustomEditText'
import DTComponent from '../Setting/DTComponent';
import DateTimePickerModel from '../Setting/DateTimePickerModel';
import Loader from '../../components/Loader';
import I18n from '../../i18n/i18n';
import API from '../../api/API';

class ListItem extends React.Component {
    render() {
        const {title, detail, image, onPress} = this.props;
        let TouchablePlatformSpecific = Platform.OS === 'ios' ?
            TouchableHighlight :
            TouchableNativeFeedback;
        return (

            <TouchableOpacity onPress={onPress}>

                <View style={listItemStyles.itemStyle}>
                    <TouchablePlatformSpecific>
                        <View style={listItemStyles.leftIconContainer}>
                        <Image style={listItemStyles.leftIconStyle}
                               source={require('../../assets/images/ic_delete.jpg')}/>
                        </View>
                    </TouchablePlatformSpecific>
                    <TouchablePlatformSpecific>
                        <View>

                            <Text style={[listItemStyles.titleStyle, listItemStyles.leftTitleEditing]}
                                  numberOfLines={1000}>{title}</Text>
                            <Text style={[listItemStyles.detailStyle, listItemStyles.leftTitleEditing]}
                                  numberOfLines={1000}>{detail}</Text>

                        </View>
                    </TouchablePlatformSpecific>
                </View>
            </TouchableOpacity>

        );
    }
}

const listItemStyles = StyleSheet.create({
    sectionStyle: {
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        height: 50,
        justifyContent: 'center',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    sectionTitleStyle: {
        position: 'absolute',
        left: 10,
        right: 100,
        bottom: 10,
        top: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },
    sectionRightButtonStyle: {
        position: 'absolute',
        right: 10,
        width: 80,
        bottom: 10,
        top: 20,
    },
    sectionRightTextStyle: {
        textAlign: 'right',
        textAlignVertical: 'center',
        fontSize: 15,
        color: 'rgba(50,50,247,1.0)',
    },

    itemStyle: {
        height: 60,
        marginTop: 24,
    },
    titleStyle: {
        height: "50%",
        top: 0,
        fontSize: 15,
    },
    detailStyle: {
        height: "50%",
        bottom: 0,
        fontSize: 13,
    },
    leftTitleUnEditing: {
        left: 10,
        right: 35,
    },
    leftTitleEditing: {
        left: 50,
        right: 35,
    },
    leftIconContainer: {
        position: 'absolute',
        left: 5,
        width: 30,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
        // backgroundColor: '#008889',
    },
    leftIconStyle: {
        position: 'absolute',
        height: 30,
        width: 30,

        // backgroundColor: '#008889',
    },
    mainStyle: {
        position: 'absolute',
        left: 100,
        right: 5,
        top: 0,
        bottom: 0,
    },
    rightIconStyle: {
        position: 'absolute',
        right: 5,
        width: 30,
        height: 30,
    },
});

class DeviceManageScreen extends React.Component {

    static navigationOptions = ({ screenProps: { i18n, language } }) => ({
        title: I18n.t('Devices Manage'),
    });

    constructor(props) {
        super(props);
        this.state ={ds: [], loading: false, refresh: true};
    }


    UNSAFE_componentWillMount() {
        this.setState({popoverIsOpen: false});
    }

    componentDidMount() {
        // const {language} = this.props;
        // if (language) this.setMainLocaleLanguage(language);
        console.log('Props: ', this.prop);
        this.fetchBoardConfiguration();
    }

    fetchBoardConfiguration() {
        this.setState({loading: false, refresh: true});
        API.fetchAPI(this.onSuccess.bind(this), this.onError.bind(this), API.url.USER_DEVICE_ITS, {}, {}, API.httpMethods.GET, API.baseURL.hot);
    }

    handleRefresh() {
        this.fetchBoardConfiguration();
    }

    onSuccess(json) {
        console.log('Success');

        let devices = JSON.parse(json);
        let i = 0;
        let deviceList = devices.map(device => {
            let item  = new Object();
            item.indexPath = {section: 0, row: i};
            item.info = device;
            i++;
            return item;
        });

        console.log(JSON.stringify(deviceList));

        var ds = [
            {
                title: 'Includes',
                data: deviceList,
                id: 0,
            }
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
                    renderItem={({item, section}) => <ListItem title={item.info.name}
                                                               detail={item.info.os + " " + item.info.version}/>}
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
    segmentSelection:{
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
        borderBottomLeftRadius:5,
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

export default DeviceManageScreen;
