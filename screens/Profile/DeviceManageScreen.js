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
    Image, TouchableOpacity, SectionList,
} from 'react-native';
import {StackNavigator} from 'react-navigation';

import CustomButton from '../../components/CustomButton';
import CustomTextView from '../../components/CustomTextView';
import  CustomEditText from '../../components/CustomEditText'
import DTComponent from '../Setting/DTComponent';
import DateTimePickerModel from '../Setting/DateTimePickerModel';
import Loader from '../../components/Loader';

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
                            <Text style={listItemStyles.sectionRightTextStyle} numberOfLines={1}>{editingWord}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else {
            if (isEditing) {
                return (

                    <View style={listItemStyles.itemStyle}>

                        <TouchableOpacity onPress={onPress}>
                            <View  style={listItemStyles.leftIconStyle}>
                                <Image style={listItemStyles.leftIconStyle}
                                       source={require('../../assets/images/ic_delete.jpg')}/>
                            </View>
                        </TouchableOpacity>


                        <Text style={listItemStyles.titleStyle} numberOfLines={1}>{word}</Text>
                        <Image style={listItemStyles.rightIconStyle}
                               source={require('../../assets/images/ic_reveal.png')}/>

                    </View>
                );
            } else {
                return (
                    <View style={listItemStyles.itemStyle}>
                        <TouchableOpacity
                            onPress={onPress}>
                            <Text style={listItemStyles.titleStyle} numberOfLines={1}>{word}</Text>
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
        height: 44,
        justifyContent: 'center',
    },
    titleStyle: {
        position: 'absolute',
        left: 50,
        right: 35,
        fontSize: 15,
    },
    leftIconStyle: {
        position: 'absolute',
        left: 5,
        width: 30,
        height: 30,
    },
    mainStyle:{
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
        title: i18n.t('login_screen_title'),
    });

    constructor(props) {
        super(props);

        let comp = new DTComponent();
        comp.InitializedDateTimeComponents();
        comp.deselectAll(DateTimePickerModel.dateComponent.SECOND);
        comp.selectAll(DateTimePickerModel.dateComponent.SECOND);
        comp.deselectItem(DateTimePickerModel.dateComponent.SECOND, 1);
        // comp.deselectAllComponent();
        console.log(JSON.stringify(comp.DTSetting));

        var ds = [
            {
                title: 'Includes',
                data: [{indexPath: {section: 0, row: 0}, timeSetting: comp.DTSetting}, {
                    indexPath: {section: 0, row: 1},
                    timeSetting: comp.DTSetting,
                }],
                isEditing: false,
                id: 0,
            },
            {
                title: 'Excludes',
                data: [{indexPath: {section: 1, row: 0}, timeSetting: comp.DTSetting}],
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

    onSelectAll() {
        console.log("Select All");
    }

    onUnselect() {
        console.log("Unselect All");
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

                <View style={homeStyles.segmentSelection}>
                    <View style={homeStyles.selectAllButton}>
                        <TouchableOpacity onPress={this.onSelectAll.bind(this)}>
                            <Text style={{  height: '100%', width: '100%', fontSize: 10, textAlign: 'center', textAlignVertical: 'center'}}>Chuông và thông báo</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={homeStyles.unselectButton}>
                        <TouchableOpacity onPress={this.onUnselect.bind(this)}>
                            <Text style={{ height: '100%', width: '100%', fontSize: 10, textAlign: 'center', textAlignVertical: 'center'}}>Chỉ chuông</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <SectionList
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    sections={ds}
                    renderItem={({item, section}) => <ListItem onPress={this.onMenuPress.bind(this, item)}
                                                               onDelete={this.onItemDelete.bind(this, item)}
                                                               word={item.word}
                                                               isEditing={section.isEditing}/>}
                    renderSectionHeader={({section}) => <ListItem onPress={this.onMenuPress.bind(this, section)}
                                                                  isEditing={section.isEditing} word={section.title}
                                                                  section/>}
                    keyExtractor={(item, index) => index}
                    extraData={this.state.refresh}/>

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
