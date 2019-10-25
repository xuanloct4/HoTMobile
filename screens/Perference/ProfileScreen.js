import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    StatusBar,
    SectionList,
    Alert, TouchableOpacity, Image, Picker,
} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import DropdownMenu from 'react-native-dropdown-menu';
import CustomTextView from '../../components/CustomTextView';
import CustomEditText from '../../components/CustomEditText';
import * as actions from '../../redux/actions/index';
import connect from 'react-redux/es/connect/connect';

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

    setLanguage = language => {
        this.setState({language});
        this.props.setLanguage(language);
        // DefaultPreference.set('App Language', language).then(function() {console.log('Updated language:', language)});
    };

    constructor(props) {
        super(props);

        var languageDS = [{index: 0, title: 'Tiếng Việt', value: 'vi', isSelected: true}, {
            index: 1,
            title: 'English',
            value: 'en',
            isSelected: false,
        }];
        var ds = [
            {title: 'D', data: [{title: 'Profile', firstname: 'Nguyen', lastname: 'Van', type: 'profile-reveal'}]},
            {
                title: 'J', data: [{title: 'Devices Manage', type: 'reveal'},
                    {title: 'Boards Manage', type: 'reveal'},
                    {title: 'Language', type: 'dropdown', ds: languageDS}],
            },
            {
                title: 'J', data: [{title: 'Term & Condition'},
                    {title: 'About'}],
            },
            {title: 'J', data: [{title: 'Logout'}]},
        ];

        this.state = {language: 'vi', languageDS: languageDS, ds: ds};

        // DefaultPreference.get('App Language').then(function(language) {
        //     this.setMainLocaleLanguage(language);
        // });
    }


    onMenuPress(item) {
        console.log(item);
        if (item.type === 'dropdown') {

        } else {

            Alert.alert(item.word);

            // this.props.navigation.navigate("Details");
        }
    }

    onChange(ds) {
        console.log(ds);
        const language = ds.filter(function (item) {
            return item.isSelected == true;
        })[0].value;

        setLanguage(language);
    }

    FlatListItemSeparator = () => {
        return (
            //Item Separator
            <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
        );
    };

    render() {
        const {ds, languageDS} = this.state;
        const {language} = this.props;
        const isVNLang = language === 'vi' ? true : false;
        return (
            <View style={styles.container}>
                <SectionList
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    sections={ds}
                    renderItem={({item}) => <ListItem onChange={(ds) => this.onChange(ds)}
                                                      onPress={this.onMenuPress.bind(this, item)} title={item.title}
                                                      type={item.type} ds={item.ds} i18nKey={item.title}
                                                      firstname={item.firstname}
                                                        lastname={item.lastname}/>}
                    renderSectionHeader={({section}) => <ListItem word={section.title} section/>}
                    keyExtractor={(item, index) => index}
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
        const {onPress, onChange, section, title, isChecked, hasDetail, hasInfo, type, ds, i18nKey, firstname, lastname} = this.props;
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
            const name = firstname + " " + lastname;
            console.log(avatar);
            console.log(name);
            return (
                <TouchableOpacity
                    onPress={onPress}>
                    <View style={listItemStyles.profileContainer}>
                        <View style={listItemStyles.profileAvatar}>
                            <Text style={listItemStyles.profileAvatarText}>{avatar}</Text>
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
                        <CustomTextView i18nKey={i18nKey} style={listItemStyles.titleStyle}
                                        numberOfLines={1}/>
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
        borderColor: "#00ffee",
        borderWidth: 1,
        borderRadius: 60/2,
        backgroundColor: "#0033ff"
    },
    profileAvatarText: {
        width: '100%',
        height: '100%',
       alignContent: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 25,
        color: '#ffffff'

    },
    profileName: {
        position: 'absolute',
        left: 80,
        right: 100,
    },
    profileNameText: {
        fontSize: 20,
    }
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

export default ProfileScreen;
