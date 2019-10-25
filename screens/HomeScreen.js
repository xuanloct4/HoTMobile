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
import ProfileScreen from './Perference/ProfileScreen';
import DetailsSCreen from './DetailsScreen';
import CustomTextView from '../components/CustomTextView';

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
                    <Image style={listItemStyles.rightIconStyle} source={require('../assets/images/ic_reveal.png')}/>
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

class HomeScreen extends React.Component {
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

    componentWillMount() {
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
                <Picker
                    selectedValue={this.state.language}
                    style={{left: '10%', height: 80, width: '80%'}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({language: itemValue})
                    }>
                    <Picker.Item label="Java" value="java"/>
                    <Picker.Item label="JavaScript" value="js"/>
                </Picker>
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
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
        overflow: 'hidden',
        backgroundColor: '#000080',
        borderColor: '#008080',
        borderWidth: 5,
        borderRadius: 25,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#ffffff',
    },
    button: {
        position: 'absolute',
        height: 50,
        width: 50,
        bottom: 30,
        right: 30,
    },
});


const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Details: DetailsSCreen,
});

const SettingsStack = createStackNavigator({
    Settings: ProfileScreen,
    Details: DetailsSCreen,
});


class IconWithBadge extends React.Component {
    render() {
        const {name, badgeCount, color, size} = this.props;
        return (
            <View style={{width: 24, height: 24, margin: 5}}>
                <Ionicons name={name} size={size} color={color}/>
                {badgeCount > 0 && (
                    <View
                        style={{
                            // /If you're using react-native < 0.57 overflow outside of the parent
                            // will not work on Android, see https://git.io/fhLJ8
                            position: 'absolute',
                            right: -6,
                            top: -3,
                            backgroundColor: 'red',
                            borderRadius: 6,
                            width: 12,
                            height: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
                            {badgeCount}
                        </Text>
                    </View>
                )}
            </View>
        );
    }
}

const HomeIconWithBadge = props => {
    // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
    return <IconWithBadge {...props} badgeCount={3}/>;
};

const getTabBarIcon = (navigation, focused, tintColor) => {
    const {routeName} = navigation.state;
    let IconComponent = Ionicons;
    let iconName;
    if (routeName === 'Home') {
        iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        // We want to add badges to home tab icon
        IconComponent = HomeIconWithBadge;
    } else if (routeName === 'Settings') {
        iconName = `ios-options${focused ? '' : '-outline'}`;
    }

    // You can return any component that you like here!
    return <IconComponent name={iconName} size={25} color={tintColor}/>;
};


const Home = createAppContainer(
    createBottomTabNavigator(
        {
            Home: HomeStack,
            Settings: ProfileScreen,
        },
        {
            // defaultNavigationOptions: ({ navigation }) => ({
            //     tabBarIcon: ({ focused, tintColor }) =>
            //         getTabBarIcon(navigation, focused, tintColor),
            // }),
            // tabBarOptions: {
            //     activeTintColor: 'tomato',
            //     inactiveTintColor: 'gray',
            // },

            defaultNavigationOptions: ({navigation}) => ({
                tabBarIcon: ({focused, horizontal, tintColor}) => {
                    const {routeName} = navigation.state;
                    let IconComponent = Ionicons;
                    let iconName;
                    if (routeName === 'Home') {
                        iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                        // Sometimes we want to add badges to some icons.
                        // You can check the implementation below.
                        IconComponent = HomeIconWithBadge;
                    } else if (routeName === 'Settings') {
                        iconName = `ios-options`;
                    }

                    // You can return any component that you like here!
                    return <IconComponent name={iconName} size={25} color={tintColor}/>;
                },
            }),
            tabBarOptions: {
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            },
            navigationOptions: ({screenProps: {i18n, language}}) => ({
                header: null,
            }),
        },
    ),
);

export default Home;
