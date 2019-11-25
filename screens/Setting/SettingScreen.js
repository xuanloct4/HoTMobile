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
} from 'react-native';
import {StackNavigator} from 'react-navigation';
// import { Ionicons } from '@expo/vector-icons';
import CustomTextView from '../../components/CustomTextView';
import DateTimePickerModel from './DateTimePickerModel';
import DTComponent from './DTComponent';
import Loader from '../../components/Loader';
import API from '../../api/API';

class ListItem extends React.Component {
    render() {
        const {onPress, onDelete, section, word, isEditing, isChecked, hasDetail, hasInfo} = this.props;
        const {sectionStyle, termStyle} = listItemStyles;
        if (section) {
            var editingWord = 'Change';
            if (isEditing) {
                editingWord = 'Finish';
            }
            return (
                <View style={listItemStyles.sectionStyle}>
                    <Text style={listItemStyles.sectionTitleStyle} numberOfLines={1}>{word}</Text>
                    <View style={listItemStyles.sectionRightButtonStyle}>
                        <TouchableOpacity onPress={onPress}>
                            <Text style={listItemStyles.sectionRightTextStyle} numberOfLines={1000}>{editingWord}</Text>
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
                            <TouchablePlatformSpecific  onPress={onPress}>
                                <View>

                                    <Text style={[listItemStyles.titleStyle , listItemStyles.leftTitleEditing]} numberOfLines={1000}>{word}</Text>
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
                            <Text style={[listItemStyles.titleStyle, listItemStyles.leftTitleUnEditing]} numberOfLines={1000}>{word}</Text>
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
    static navigationOptions = {
        header: null,
    };

    comp = new DTComponent();

    constructor(props) {
        super(props);

        this.comp.InitializedDateTimeComponents();
        this.comp.deselectAll(DateTimePickerModel.dateComponent.SECOND);
        this.comp.selectAll(DateTimePickerModel.dateComponent.SECOND);
        this.comp.deselectItem(DateTimePickerModel.dateComponent.SECOND, 1);
        // this.comp.deselectAllComponent();
        console.log(JSON.stringify(this.comp.DTSetting));

        var ds = [
            {
                title: 'Includes',
                data: [{
                    indexPath: {section: 0, row: 0},
                    timeSetting: this.comp.DTSetting,
                    forRinging: true,
                    forAlarm: false,
                },
                    {
                        indexPath: {section: 0, row: 1},
                        timeSetting: this.comp.DTSetting,
                        forRinging: false,
                        forAlarm: true,
                    }],
                isEditing: false,
                id: 0,
            },
            {
                title: 'Excludes',
                data: [{
                    indexPath: {section: 1, row: 0},
                    timeSetting: this.comp.DTSetting,
                    forRinging: true,
                    forAlarm: true,
                },
                    {
                        indexPath: {section: 0, row: 1},
                        timeSetting: this.comp.DTSetting,
                        forRinging: true,
                        forAlarm: true,
                    }],
                isEditing: false,
                id: 1,
            },
        ];
        var languageDS = [{index: 0, word: 'Tiếng Việt'}, {index: 1, word: 'English'}];
        this.state = {languageDS: {languageDS}, ds: ds, loading: false, refresh: true};

        // DefaultPreference.get('App Language').then(function(language) {
        //     this.setMainLocaleLanguage(language);
        // });
    }

    UNSAFE_componentWillMount() {
        this.setState({popoverIsOpen: false});
    }

    fetchTimeSetting() {
        // fetchAPI(onSuccess, onError, url, bodyObject, additionalHeaders, method=API.httpMethods.GET, baseURL= API.baseURL.hot)
        API.fetchAPI();
    }

    getTimeSettingSummary(item) {
        console.log(JSON.stringify(item.timeSetting));
        let sum = '';
        for (let i = 0; i < DateTimePickerModel.TimeComponents().length; i++) {
            if (i > 0) {
                sum += ', \n';
            }
            sum += this.comp.summarize(DateTimePickerModel.TimeComponents()[i].component);
        }

        console.log(sum);
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
        this.setState({ds: ds, refresh: !this.state.refresh});
    }

    onMenuPress(item, section) {
        console.log('On Item pressed');
        console.log(section);

        this.props.navigation.navigate('DetailDateTime', {DateTimeSetting: item, isEditing: section.isEditing});
    }

    onItemDelete(item) {
        console.log('On Item deleted');
        console.log(item);
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
        const {languageDS} = this.state.languageDS;
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
                    extraData={this.state.refresh}/>

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
                            <FlatList
                                ItemSeparatorComponent={this.FlatListItemSeparator}
                                data={languageDS}
                                renderItem={({item}) => <Text style={homeStyles.item}>{item.word}</Text>}/>
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
});


export default SettingScreen;
