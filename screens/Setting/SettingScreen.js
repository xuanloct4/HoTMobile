import React from 'react';
import {
    Alert,
    Button,
    FlatList,
    Image,
    Modal,
    SectionList,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TouchableNativeFeedback,
    TouchableHighlight,
    View,
    Platform,
    RefreshControl,
} from 'react-native';
import {StackNavigator} from 'react-navigation';
// import { Ionicons } from '@expo/vector-icons';
import CustomTextView from '../../components/CustomTextView';
import DateTimePickerModel from './DateTimePickerModel';
import DTComponent from './DTComponent';
import Loader from '../../components/Loader';
import API from '../../api/API';
import DataManager from '../../app_data/DataManager';
import I18n from '../../i18n/i18n';
// import connect from 'react-redux/es/connect/connect';
import {connect} from 'react-redux';
import DefaultPreference from 'react-native-default-preference';

class ListItem extends React.Component {
    render() {
        const {onPress, onDelete, section, word, isEditing, isChecked, hasDetail, hasInfo} = this.props;
        const {sectionStyle, termStyle} = listItemStyles;
        if (section) {
            var editingWord = 'change_text';
            if (isEditing) {
                editingWord = 'finish_text';
            }
            return (
                <View style={listItemStyles.sectionStyle}>
                    <CustomTextView i18nKey={word} style={listItemStyles.sectionTitleStyle}
                                    numberOfLines={1}></CustomTextView>
                    <View style={listItemStyles.sectionRightButtonStyle}>
                        <TouchableOpacity onPress={onPress}>
                            <CustomTextView i18nKey={editingWord} style={listItemStyles.sectionRightTextStyle}
                                            numberOfLines={1000}></CustomTextView>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else {
            if (isEditing) {
                let TouchablePlatformSpecific = Platform.OS === 'ios' ?
                    TouchableHighlight :
                    TouchableNativeFeedback;
                return (

                    <TouchableOpacity onPress={onPress}>

                        <View style={listItemStyles.itemStyle}>
                            <TouchablePlatformSpecific onPress={onDelete}>
                                <Image style={listItemStyles.leftIconStyle}
                                       source={require('../../assets/images/ic_delete.jpg')}/>
                            </TouchablePlatformSpecific>
                            <TouchablePlatformSpecific onPress={onPress}>
                                <View>

                                    <Text style={[listItemStyles.titleStyle, listItemStyles.leftTitleEditing]}
                                          numberOfLines={1000}>{word}</Text>
                                    <Image style={listItemStyles.rightIconStyle}
                                           source={require('../../assets/images/ic_reveal.png')}/>

                                </View>
                            </TouchablePlatformSpecific>
                        </View>
                    </TouchableOpacity>

                );
            } else {
                return (
                    <View style={listItemStyles.itemStyle}>
                        <TouchableOpacity
                            onPress={onPress}>
                            <Text style={[listItemStyles.titleStyle, listItemStyles.leftTitleUnEditing]}
                                  numberOfLines={1000}>{word}</Text>
                        </TouchableOpacity>
                    </View>
                );
            }
        }
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
        height: 130,
    },
    titleStyle: {
        position: 'absolute',
        right: 35,
        fontSize: 15,
    },
    leftTitleUnEditing: {
        left: 10,
    },
    leftTitleEditing: {
        left: 50,
    },
    leftIconStyle: {
        position: 'absolute',
        left: 5,
        width: 30,
        height: 30,
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

class SettingScreen extends React.Component {
    static navigationOptions = ({navigation, screenProps, navigationOptions}) => {
        console.log('Navigation options:   ', JSON.stringify(navigationOptions));
        if (navigationOptions.screenProps && navigationOptions.screenProps.i18n) {
            return {
                title: navigationOptions.screenProps.i18n.t('time_setting_screen_title'),
            };
        } else if (screenProps.i18n) {
            return {
                title: screenProps.i18n.t('time_setting_screen_title'),
            };
        }
    };


    constructor(props) {
        super(props);
        this.state = {
            i18n: I18n,
        };
        this.state = {ds: [], loading: false, refresh: false};

        // DefaultPreference.get('App Language').then(function(language) {
        //     this.setMainLocaleLanguage(language);
        // });
    }

    UNSAFE_componentWillMount() {
        this.setState({popoverIsOpen: false});
    }

    componentDidMount() {
        // const {language} = this.props;
        // if (language) this.setMainLocaleLanguage(language);
        console.log('Props: ', this.prop);
        this.fetchTimeSetting();
    }

    setMainLocaleLanguage = language => {
        let i18n = this.state.i18n;
        i18n.locale = language;
        this.setState({i18n});
    };

    fetchTimeSetting() {
        this.setState({loading: false, refresh: true});

        let query = new Object();
        let category = new Object();
        category.list = '2';
        category.isAnd = false;
        query.category_spec = category;
        query.is_deleted = false;
        query.is_activated = true;
        query.isAnd = false;

        API.fetchAPI(this.onSuccess.bind(this), this.onError.bind(this), API.url.USER_CONFIGURATION_SEARCH, query, {}, API.httpMethods.POST, API.baseURL.hot);
    }


    onSuccess(json) {
        console.log('Success');
        // let j = json.replace(/\\\"/g, "\"");
        // console.log("JSON:  ",j);
        let list = JSON.parse(json).list;
        list = list.map(item => {
            let m = item;
            m.strings = JSON.parse(item.strings);
            return m;
        });

        let excludesList = list.filter(item => {
            if (item.strings && item.strings.excludes) {
                return true;
            }
        });

        let includesList = list.filter(item => {
            if (item.strings && item.strings.includes) {
                return true;
            }
        });

        let inDS = new Array();
        let exDS = new Array();
        for (let i = 0; i < includesList.length; i++) {
            let inItem = new Object();
            let indexPath = new Object();
            indexPath.row = i;
            indexPath.section = 0;
            inItem.indexPath = indexPath;
            inItem.timeSetting = includesList[i].strings.includes;
            inItem.forRinging = includesList[i].strings.forRinging;
            inItem.forAlarm = includesList[i].strings.forAlarm;
            inDS.push(inItem);
        }

        for (let i = 0; i < excludesList.length; i++) {
            let exItem = new Object();
            let indexPath = new Object();
            indexPath.row = i;
            indexPath.section = 1;
            exItem.indexPath = indexPath;
            exItem.timeSetting = excludesList[i].strings.excludes;
            exItem.forRinging = excludesList[i].strings.forRinging;
            exItem.forAlarm = excludesList[i].strings.forAlarm;
            exDS.push(exItem);
        }

        // console.log('InDS ', JSON.stringify(inDS));
        // console.log('ExDS ', JSON.stringify(exDS));

        let ds = new Array();
        let ii = new Object();
        ii.title = 'includes_text';
        ii.data = inDS;
        ii.isEditing = false;
        ii.id = 0;

        let ex = new Object();
        ex.title = 'excludes_text';
        ex.data = exDS;
        ex.isEditing = false;
        ex.id = 1;

        ds.push(ii);
        ds.push(ex);

        console.log(JSON.stringify(ds));

        this.setState({ds: ds, loading: false, refresh: false});
    }

    onError(error) {
        this.setState({ds: ds, loading: false, refresh: false});
        // this.setState({loading: false, usernameErrorKey: '', passwordErrorKey : 'wrong_username_or_password'});
    }

    getTimeSettingSummary(item) {
        let ts = new DTComponent();
        ts.DTSetting = item.timeSetting;

        // console.log("I18n: ", I18n);
        // console.log(JSON.stringify(item.timeSetting));
        let sum = '';
        for (let i = 0; i < DateTimePickerModel.TimeComponents().length; i++) {
            if (i > 0) {
                sum += ', \n';
            }
            sum += ts.summarize(DateTimePickerModel.TimeComponents()[i].component, I18n);
        }

        console.log(JSON.stringify(ts));
        return sum;
    }

    onHeaderPress(section) {
        console.log('On Section pressed');
        console.log(section);

        let ds = this.state.ds;
        for (let i = 0; i < ds.length; i++) {
            if (section.id == ds[i].id) {
                ds[i].isEditing = !ds[i].isEditing;
                break;
            }
        }
        this.setState({ds: ds, loading: false, refresh: false});
    }

    onMenuPress(item, section) {
        console.log('On Item pressed');
        console.log(section);

        this.props.navigation.navigate('DetailDateTime', {
            DateTimeSetting: item,
            isEditing: section.isEditing,
            isAddNew: false,
            screenProps: {i18n: this.state.i18n, locale: this.state.language},
        });
    }

    addNewInclude() {
        console.log("Add new Include");
        var comp = new DTComponent();
        comp.InitializedDateTimeComponents();
        // this.comp.deselectAll(DateTimePickerModel.dateComponent.SECOND);
        // this.comp.selectAll(DateTimePickerModel.dateComponent.SECOND);
        // this.comp.deselectItem(DateTimePickerModel.dateComponent.SECOND, 1);
        // this.comp.deselectAllComponent();
        comp.selectAllComponent();
        // console.log(JSON.stringify(comp.DTSetting));

        this.setPopoverIsOpen(false);
        this.props.navigation.navigate('DetailDateTime', {
            DateTimeSetting: {timeSetting: comp.DTSetting},
            isEditing: true,
            isAddNew: true,
            screenProps: {i18n: this.state.i18n, locale: this.state.language},
        });
    }

    addNewExclude() {
        console.log("Add new Exclude");
        var comp = new DTComponent();
        comp.InitializedDateTimeComponents();
        comp.deselectAllComponent();
        // console.log(JSON.stringify(comp.DTSetting));
        this.setPopoverIsOpen(false);
        this.props.navigation.navigate('DetailDateTime', {
            DateTimeSetting: {timeSetting: comp.DTSetting},
            isEditing: true,
            isAddNew: true,
            screenProps: {i18n: this.state.i18n, locale: this.state.language},
        });
    }

    onItemDelete(item) {
        console.log('On Item deleted');
        console.log(item);
    }

    handleRefresh() {
        this.fetchTimeSetting();
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
        return (
            <View style={homeStyles.container}>
                <Loader
                    loading={this.state.loading}/>
                <SectionList
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    sections={ds}
                    renderItem={({item, section}) => <ListItem onPress={this.onMenuPress.bind(this, item, section)}
                                                               onDelete={this.onItemDelete.bind(this, item)}
                                                               word={this.getTimeSettingSummary(item)}
                                                               isEditing={section.isEditing}/>}
                    renderSectionHeader={({section}) => <ListItem onPress={this.onHeaderPress.bind(this, section)}
                                                                  isEditing={section.isEditing} word={section.title}
                                                                  section/>}
                    keyExtractor={(item, index) => index}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refresh}
                            onRefresh={this.handleRefresh.bind(this)}/>
                    }
                    extraData={this.state.refreshing}/>

                <TouchableOpacity onPress={() => {
                    this.setPopoverIsOpen(true);
                }} style={homeStyles.button}>
                    <View>
                        <CustomTextView i18nKey='add_new' style={homeStyles.buttonText}/>
                    </View>
                </TouchableOpacity>


                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.popoverIsOpen}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <TouchableOpacity onPressOut={() => {
                        this.setPopoverIsOpen(false);
                    }}
                                      style={{
                                          flex: 1,
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                      }}>
                        <View style={{
                            width: '90%',
                            height: 90,
                            backgroundColor: '#ffffff',
                        }}>

                            <View style={homeStyles.addInclude}>
                                <TouchableOpacity onPress={this.addNewInclude.bind(this)}>
                                    <CustomTextView i18nKey='add_include_text'
                                                    style={homeStyles.addNewText}/>
                                </TouchableOpacity>
                            </View>
                            <this.FlatListItemSeparator style={{top: '49%'}}/>
                            <View style={homeStyles.addExclude}>
                                <TouchableOpacity onPress={this.addNewExclude.bind(this)}>
                                    <CustomTextView i18nKey='add_exclude_text'
                                                    style={homeStyles.addNewText}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }
}

const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
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
    addInclude: {
        top: 0,
        height: '50%',
    },
    addExclude: {
        bottom: 0,
        height: '50%',
    },
    addNewText: {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 18,
        color: 'rgba(50,50,247,1.0)',
    },
});

const mapStateToProps = state => {
    return {
        language: state.languageReducer.language,
    };
};

export default connect(mapStateToProps, null)(SettingScreen);
