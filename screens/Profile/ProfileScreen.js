import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    StatusBar,
    SectionList,
    Alert, TouchableOpacity, Image, Picker, Platform, TouchableHighlight, TouchableNativeFeedback,
} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {Popover, PopoverController} from 'react-native-modal-popover';
import LinearGradient from 'react-native-linear-gradient';
import DropdownMenu from 'react-native-dropdown-menu';
import CustomTextView from '../../components/CustomTextView';
import CustomEditText from '../../components/CustomEditText';
import * as actions from '../../redux/actions/index';
import {connect} from 'react-redux';
import AccountInfoScreen from './AccountInfoScreen';
import DeviceManageScreen from './DeviceManageScreen';
import BoardManageScreen from './BoardManageScreen';
import TermConditionScreen from './TermConditionScreen';
import AboutScreen from './AboutScreen';
import I18n from '../../i18n/i18n';
import API from '../../api/API';
import Loader from '../../components/Loader';
import DataManager from '../../app_data/DataManager';
import DefaultPreference from 'react-native-default-preference';

// import TableView from 'react-native-tableview';
// const {Section, Item} = TableView;
//
// import Example1 from './TableViewExample/Example1';
// import Example2 from './TableViewExample/Example2';
// import Example3 from './TableViewExample/Example3';
// import Example4 from './TableViewExample/Example4';
// import Example5 from './TableViewExample/Example5';
// import Example6 from './TableViewExample/Example6';
// import Example7 from './TableViewExample/Example7';
// import Example8 from './TableViewExample/Example8';

class ProfileScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    setMainLocaleLanguage = language => {
        // this.props.setLanguage(language);
        let i18n = I18n;
        // let i18n = this.state.i18n;
        i18n.locale = language;
        this.setState({i18n: i18n, language: language});
    };


    setMainLocaleLanguage = language => {
        this.props.setLanguage(language);
        let i18n = I18n;
        // let i18n = this.state.i18n;
        i18n.locale = language;
        this.setState({i18n: i18n, language: language});
    };

    setLanguage = language => {
        console.log(language);
        this.setMainLocaleLanguage(language);
        this.initDS();
        DefaultPreference.set('App Language', language).then(function () {
            console.log('Updated language:', language);
            DataManager.getInstance().storeKeyValue('App Language', language);

        });
    };

    selectedLanguage = '';

    constructor(props) {
        super(props);
        this.state = {language: DataManager.getInstance().valueForKey('App Language'), languageDS: [], ds: [], loading: false, refresh: true};
    }


    componentDidMount() {
        this.initDS();
    }

    initDS() {
        let languageDS = [{index: 0, title: 'Tiếng Việt', value: 'vi', isSelected: true},
            {index: 1, title: 'English', value: 'en', isSelected: false}];

        let appLanguage = DataManager.getInstance().valueForKey('App Language');
        let selectedLanguageDS = languageDS.filter(function (item) {
            return item.value === appLanguage;
        });

        if (selectedLanguageDS.length > 0) {
            this.selectedLanguage = selectedLanguageDS[0].title;
        }


        let ds = [
            {
                title: 'D',
                data: [{
                    title: 'Profile',
                    firstname: 'Nguyen',
                    lastname: 'Van',
                    type: 'profile-reveal',
                    navigation: 'AccountInfo',
                }],
            },
            {
                title: 'J', data: [{title: I18n.t('Devices Manage'), type: 'reveal', navigation: 'Devices'},
                    {title: I18n.t('Boards Manage'), type: 'reveal', navigation: 'Boards'},
                    {title: I18n.t('Language'), detail: this.selectedLanguage, type: 'dropdown', ds: languageDS}],
            },
            {
                title: 'J', data: [{title: I18n.t('Term & Condition'), navigation: 'TermCondition'},
                    {title: I18n.t('About'), navigation: 'About'}],
            },
            {title: 'J', data: [{title: I18n.t('Logout'), type: 'logout'}]},
        ];

        this.setState({language: appLanguage, languageDS: languageDS, ds: ds, loading: false, refresh: true});
    }

    logout() {
        console.log('Logout');
        console.log(JSON.stringify(this.props));
        Alert.alert(
            I18n.t('logout_alert_title'),
            I18n.t('logout_alert_message'),
            [
                {
                    text: I18n.t('Cancel'),
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: I18n.t('OK'),
                    onPress: () => {
                        // this.props.screenProps.parentNavigation.navigate("Auth");
                        this.setState({loading: true});
                        API.fetchAPI(this.onSuccess.bind(this), this.onError.bind(this), API.url.USER_LOGOUT, {}, {}, API.httpMethods.POST, API.baseURL.hot);
                    },
                },
            ],
            {cancelable: false},
        );
    }

    onSuccess(json) {
        console.log('Success');
        this.setState({loading: false});
        this.props.screenProps.parentNavigation.navigate('Auth');
    }

    onError(error) {
        this.setState({loading: false});
        Alert.alert(
            I18n.t('logout_error_alert_title'),
            I18n.t('logout_error_alert_message'),
            [
                {
                    text: I18n.t('OK'),
                    onPress: () => {
                    },
                },
            ],
            {cancelable: true},
        );
    }

    onMenuPress(item) {
        console.log(JSON.stringify(this.props));
        console.log(item);
        if (item.type === 'dropdown') {

        } else if (item.type === 'logout') {
            this.logout();
        } else {
            this.props.navigation.navigate(item.navigation);
        }
    }

    onChange(ds) {
        console.log('On change ds');
        console.log(ds);
        let selectedLanguageDS = ds.filter(function (item) {
            return item.isSelected === true;
        });

        if (selectedLanguageDS.length > 0) {
            const language = selectedLanguageDS[0].value;
            this.setLanguage(language);
        }


    }

    render() {
        const {ds, languageDS} = this.state;
        const {language} = this.props;
        const isVNLang = language === 'vi' ? true : false;
        return (
            <View style={styles.container}>
                <Loader
                    loading={this.state.loading}/>
                <SectionList
                    ItemSeparatorComponent={FlatListItemSeparator}
                    sections={ds}
                    renderItem={({item}) => <ListItem onChange={(ds) => this.onChange(ds)}
                                                      onPress={this.onMenuPress.bind(this, item)}
                                                      title={item.title}
                                                      detail={item.detail}
                                                      type={item.type} ds={item.ds} i18nKey={item.title}
                                                      firstname={item.firstname}
                                                      lastname={item.lastname}/>}
                    renderSectionHeader={({section}) => <ListItem word={section.title} section/>}
                    keyExtractor={(item, index) => index}
                    extraData={this.state.refresh}
                />
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedLanguage: 'vi'};
    }

    setLanguage = language => {
        this.setState({language});
        this.props.setLanguage(language);
        // DefaultPreference.set('App Language', language).then(function() {console.log('Updated language:', language)});
    };


    pickerChange(index, ds) {
        ds.map((v, i) => {
            if (index === i) {
                ds[index].isSelected = true;
                this.setState({
                    selectedLanguageLabel: ds[index].title,
                    selectedLanguage: ds[index].value,
                });
            } else {
                ds[i].isSelected = false;
            }
        });
    }

    render() {
        let TouchablePlatformSpecific = Platform.OS === 'ios' ?
            TouchableHighlight :
            TouchableNativeFeedback;
        const {onPress, onChange, navigation, section, title, detail, isChecked, hasDetail, hasInfo, type, ds, i18nKey, firstname, lastname} = this.props;
        if (section) {
            return (
                <TouchableOpacity>
                    <View>
                        <CustomTextView style={listItemStyles.sectionStyle}>{title}</CustomTextView>
                    </View>
                </TouchableOpacity>
            );
        }
        else if (type === 'dropdown') {
            return (
                <PopoverController>
                    {({openPopover, closePopover, popoverVisible, setPopoverAnchor, popoverAnchorRect}) => (
                        <React.Fragment>
                            <TouchableOpacity
                                ref={setPopoverAnchor} onPress={openPopover}>
                                <View style={{paddingTop: 20, height: 70}}>
                                    <CustomTextView style={{
                                        position: 'absolute',
                                        left: 10,
                                        right: 35,
                                        top: 10,
                                        fontSize: 15,}}
                                                    numberOfLines={1}>
                                        {title}
                                    </CustomTextView>
                                    <CustomTextView style={{
                                        position: 'absolute',
                                        left: 10,
                                        right: 35,
                                        top: 35,
                                        fontSize: 12,
                                        color: '#999999',
                                    }}
                                                    numberOfLines={1}>
                                        {detail}
                                    </CustomTextView>
                                    <Image style={listItemStyles.rightIconStyle}
                                           source={require('../../assets/images/ic_arrow_dropdown.png')}/>
                                </View>
                            </TouchableOpacity>
                            <Popover
                                contentStyle={{paddingLeft: 16, paddingRight: 16}}
                                arrowStyle={styles.arrow}
                                backgroundStyle={styles.background}
                                visible={popoverVisible}
                                onClose={closePopover}
                                fromRect={popoverAnchorRect}
                                supportedOrientations={['portrait', 'landscape']}
                            >
                                <View style={listItemStyles.languageItem}>
                                    <TouchableOpacity onPress={() => {
                                        console.log('Choose Tiếng Việt');
                                        closePopover();
                                        this.pickerChange(0, ds);
                                        onChange(ds);
                                    }}>
                                        <Text>Tiếng Việt</Text>
                                    </TouchableOpacity>
                                </View>
                                <FlatListItemSeparator></FlatListItemSeparator>
                                <View style={listItemStyles.languageItem}>
                                    <TouchableOpacity onPress={() => {
                                        console.log('Choose English');
                                        closePopover();
                                        this.pickerChange(1, ds);
                                        onChange(ds);
                                    }}>
                                        <Text>English</Text>
                                    </TouchableOpacity>
                                </View>
                            </Popover>
                        </React.Fragment>
                    )}
                </PopoverController>
            );
        } else if (type === 'logout') {
            return (
                <View style={listItemStyles.logoutButton}>
                    <TouchableOpacity onPress={onPress}>
                        <CustomTextView style={{
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            fontSize: 18,
                        }}>{title}</CustomTextView>
                    </TouchableOpacity>
                </View>
            );
        }
        else if (type === 'picker') {
            let items = ds.map((v) => {
                return <Picker.Item label={v.title} value={v.value}/>;
            });
            return (
                <View style={listItemStyles.pickerItemStyle}>
                    <Picker
                        style={{flex: 1}}
                        selectedValue={
                            ds.filter(function (item) {
                                return item.isSelected == true;
                            })[0].value
                        }
                        onValueChange={
                            (itemValue, itemIndex) => {
                                this.pickerChange(itemIndex, ds);
                                onChange(ds);
                            }
                        }
                    >
                        {
                            ds.map((v) => {
                                return <Picker.Item label={v.title} value={v.value}/>;
                            })
                        }
                    </Picker>
                </View>
            );
        } else if (type === 'profile-reveal') {

            const avatar = firstname.charAt(0) + lastname.charAt(0);
            const name = firstname + ' ' + lastname;
            console.log(avatar);
            console.log(name);
            return (
                <TouchableOpacity
                    onPress={onPress}>
                    <View style={listItemStyles.profileContainer}>
                        <View style={listItemStyles.profileAvatar}>
                            <LinearGradient start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                                            locations={[0, 0.5, 0.6]}
                                            colors={['#4c669f', '#3b5998', '#192f6a']}
                                            style={listItemStyles.linearGradient}>
                                <Text style={listItemStyles.profileAvatarText}>{avatar}</Text>
                            </LinearGradient>
                        </View>
                        <View style={listItemStyles.profileName}>
                            <Text style={listItemStyles.profileNameText}>{name}</Text>
                        </View>
                        <Image style={listItemStyles.rightIconStyle}
                               source={require('../../assets/images/ic_reveal.png')}/>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    onPress={onPress}>
                    <View style={listItemStyles.itemStyle}>
                        <CustomTextView style={listItemStyles.titleStyle}
                                        numberOfLines={1}>{title}</CustomTextView>
                        <Image style={listItemStyles.rightIconStyle}
                               source={require('../../assets/images/ic_reveal.png')}/>
                    </View>
                </TouchableOpacity>
            );
        }
    }
}

const listItemStyles = StyleSheet.create({
    sectionStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    itemStyle: {
        height: 44,
        justifyContent: 'center',
    },
    titleStyle: {
        position: 'absolute',
        left: 10,
        right: 35,
        fontSize: 15,
    },
    rightIconStyle: {
        position: 'absolute',
        right: 5,
        width: 30,
        height: 30,
    },
    pickerItemStyle: {
        left: 0,
        right: 10,
        height: 45,
    },

    profileContainer: {
        height: 70,
        justifyContent: 'center',
    },
    profileAvatar: {
        position: 'absolute',
        justifyContent: 'center',
        left: 15,
        width: 60,
        height: 60,
        borderColor: '#00ffee',
        borderWidth: 1,
        borderRadius: 60 / 2,
        backgroundColor: '#0033ff',
        overflow: 'hidden',
    },
    profileAvatarText: {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 25,
        color: '#ffffff',

    },
    profileName: {
        position: 'absolute',
        left: 80,
        right: 100,
    },
    profileNameText: {
        fontSize: 20,
    },
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    languageItem: {
        paddingTop: 16,
        paddingBottom: 16,
    },
    logoutButton: {
        backgroundColor: '#006699',
        borderColor: '#999999',
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,

        paddingTop: 10,
        paddingBottom: 10,

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

const FlatListItemSeparator = () => {
    return (
        //Item Separator
        <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
