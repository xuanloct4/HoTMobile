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
import {Popover, PopoverController} from 'react-native-modal-popover';
import LinearGradient from 'react-native-linear-gradient';
import DropdownMenu from 'react-native-dropdown-menu';
import CustomTextView from '../../components/CustomTextView';
import CustomEditText from '../../components/CustomEditText';
import * as actions from '../../redux/actions/index';
import connect from 'react-redux/es/connect/connect';
import AccountInfoScreen from './AccountInfoScreen';
import DeviceManageScreen from './DeviceManageScreen';
import BoardManageScreen from './BoardManageScreen';
import TermConditionScreen from './TermConditionScreen';
import AboutScreen from './AboutScreen';

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
                title: 'J', data: [{title: 'Devices Manage', type: 'reveal', navigation: 'Devices'},
                    {title: 'Boards Manage', type: 'reveal', navigation: 'Boards'},
                    {title: 'Language', type: 'dropdown', ds: languageDS}],
            },
            {
                title: 'J', data: [{title: 'Term & Condition', navigation: 'TermCondition'},
                    {title: 'About', navigation: 'About'}],
            },
            {title: 'J', data: [{title: 'Logout', type: 'logout'}]},
        ];

        this.state = {language: 'vi', languageDS: languageDS, ds: ds};

        // DefaultPreference.get('App Language').then(function(language) {
        //     this.setMainLocaleLanguage(language);
        // });
    }

    logout() {
        console.log('Logout');
    }

    onMenuPress(item) {
        console.log(item);
        if (item.type === 'dropdown') {

        } else if (item.type === 'logout') {
            this.logout();
        } else {

            this.props.navigation.navigate(item.navigation);
        }
    }

    onChange(ds) {
        console.log(ds);
        const language = ds.filter(function (item) {
            return item.isSelected == true;
        })[0].value;

        setLanguage(language);
    }

    render() {
        const {ds, languageDS} = this.state;
        const {language} = this.props;
        const isVNLang = language === 'vi' ? true : false;
        return (
            <View style={styles.container}>
                <SectionList
                    ItemSeparatorComponent={FlatListItemSeparator}
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
        const {onPress, onChange, navigation, section, title, isChecked, hasDetail, hasInfo, type, ds, i18nKey, firstname, lastname} = this.props;
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
                                <View style={{ paddingTop: 20, height: 70}}>
                                    <CustomTextView style={{ position: 'absolute',
                                        left: 10,
                                        right: 35,
                                        top: 10,
                                        fontSize: 15,}}
                                                    numberOfLines={1}>
                                        {title}
                                    </CustomTextView>
                                    <CustomTextView style={{ position: 'absolute',
                                        left: 10,
                                        right: 35,
                                        top: 40,
                                        fontSize: 15,}}
                                                    numberOfLines={1}>
                                        {title}
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
                                        console.log('Tiếng Việt');
                                        closePopover();
                                    }}>
                                        <Text>Tiếng Việt</Text>
                                    </TouchableOpacity>
                                </View>
                                <FlatListItemSeparator></FlatListItemSeparator>
                                <View style={listItemStyles.languageItem}>
                                    <TouchableOpacity onPress={() => {
                                        console.log('English');
                                        closePopover();
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
                        <CustomTextView i18nKey={'Logout'} style={{
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            fontSize: 18,
                        }}></CustomTextView>
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
        borderColor: '#00ffee',
        borderWidth: 1,
        borderRadius: 60 / 2,
        backgroundColor: '#0033ff',
        overflow: 'hidden',
    },
    profileAvatarText: {
        width: '100%',
        height: '100%',
        alignContent: 'center',
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

// export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
export default ProfileScreen;
