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
        const {key, value} = this.props;

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
        left: 5,
        width: 30,
        height: 30,
    },
    rightIconStyle: {
        position: 'absolute',
        right: 5,
        width: 30,
        height: 30,
    },
});


class AccountInfoScreen extends React.Component {

    static navigationOptions = ({});

    constructor(props) {
        super(props);

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

export default AccountInfoScreen;
