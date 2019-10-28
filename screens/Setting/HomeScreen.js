import React from 'react';
import {
    Alert,
    FlatList,
    Image,
    Modal,
    Picker,
    SectionList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {createAppContainer, StackNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
// import { Ionicons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomTextView from '../../components/CustomTextView';
import ProfileStack from '../../stacks/ProfileStack';

class ListItem extends React.Component {
    render() {
        const {onPress, section, word, isChecked, hasDetail, hasInfo} = this.props;
        const {sectionStyle, termStyle} = listItemStyles;
        if (section) {
            return (
                <TouchableOpacity>
                    <View>
                        <Text style={listItemStyles.sectionStyle}>{word}</Text>
                    </View>
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity
                onPress={onPress}>
                <View style={listItemStyles.itemStyle}>
                    <Text style={listItemStyles.titleStyle} numberOfLines={1}>{word}</Text>
                    <Image style={listItemStyles.rightIconStyle} source={require('../../assets/images/ic_reveal.png')}/>
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
});

class SettingScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        var ds = [
            {title: 'Includes', data: [{word: 'Devin'}, {word: 'Dan'}]},
            {title: 'Excludes', data: [{word: 'Jackson'}, {word: 'John'}, {word: 'Julie'}]},
        ];
        var languageDS = [{index: 0, word: 'Tiếng Việt'}, {index: 1, word: 'English'}];
        this.state = {languageDS: {languageDS}, ds: {ds}};

        // DefaultPreference.get('App Language').then(function(language) {
        //     this.setMainLocaleLanguage(language);
        // });
    }

    UNSAFE_componentWillMount() {
        this.setState({popoverIsOpen: false});
    }

    onMenuPress(item) {
        console.log(item);
        Alert.alert(item.word);
        // this.props.navigation.navigate("Details");
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
        const {ds} = this.state.ds;
        const {languageDS} = this.state.languageDS;
        return (
            <View style={homeStyles.container}>
                <SectionList
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    sections={ds}
                    renderItem={({item}) => <ListItem onPress={this.onMenuPress.bind(this, item)} word={item.word}/>}
                    renderSectionHeader={({section}) => <ListItem word={section.title} section/>}
                    keyExtractor={(item, index) => index}
                />

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
