import React from 'react';
import {
    Alert,
    FlatList,
    Image,
    Modal,
    SectionList,
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    BackHandler
} from 'react-native';
import {StackNavigator} from 'react-navigation';
// import { Ionicons } from '@expo/vector-icons';
import CustomTextView from '../../components/CustomTextView';
import DateTimePickerModel from './DateTimePickerModel';
import DTComponent from './DTComponent';
import Loader from '../../components/Loader';
import CustomButton from '../../components/CustomButton';
import Alarm from './AlarmType';

class ListItem extends React.Component {
    render() {
        const {onPress, onDelete, section, word, isEditing, isChecked, hasDetail, hasInfo} = this.props;
        const {sectionStyle, termStyle} = listItemStyles;
        if (section) {
            let editingWord = 'Change';
            let resetingWord = 'Reset';
            return (
                <View style={listItemStyles.sectionStyle}>
                    <Text style={listItemStyles.sectionTitleStyle} numberOfLines={1}>{word}</Text>
                    <View style={listItemStyles.sectionRightButtonStyle}>
                        <TouchableOpacity onPress={onPress}>
                            <Text style={listItemStyles.sectionRightTextStyle} numberOfLines={1}>{resetingWord}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else {
            if (isEditing) {
                return (
                    <TouchableOpacity onPress={onPress}>
                        <View style={listItemStyles.itemStyle}>
                            <Text style={[listItemStyles.titleStyle, listItemStyles.leftTitleUnEditing]} numberOfLines={1000}>{word}</Text>
                            <Image style={listItemStyles.rightIconStyle}
                                   source={require('../../assets/images/ic_reveal.png')}/>
                        </View>
                    </TouchableOpacity>
                );
            } else {
                return (
                    <TouchableOpacity onPress={onPress}>
                        <View style={listItemStyles.itemStyle}>
                            <Text style={[listItemStyles.titleStyle, listItemStyles.leftTitleUnEditing]} numberOfLines={1000}>{word}</Text>
                        </View>
                    </TouchableOpacity>
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
        height: 120,
        justifyContent: 'center',
    },
    titleStyle: {
        position: 'absolute',
        right: 35,
        fontSize: 15,
    },
    leftTitleUnEditing: {
        left: 10,
    },
    leftIconStyle: {
        position: 'absolute',
        left: 5,
        width: 30,
        height: 30,
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

class DetailDateTimeScreen extends React.Component {
    static navigationOptions = ({screenProps: {i18n, locale}}) => ({
        title: i18n.t('login_screen_title'),
        // title: 'Time Setting',
    });

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    handleBackPress = () => {
        // this.goBack(); // works best when the goBack is async
        console.log("On back pressed");
        this.props.navigation.navigate('Home', {});
        return true;
    }

    UNSAFE_componentWillMount() {
        this.setState({popoverIsOpen: false});
        console.log('DetailDateTimeScreen Componenet Will Mount');
        this.reset();
    }

    reset() {
        console.log("Reset");
        const { navigation } = this.props;
        this.initDS(navigation.getParam('DateTimeSetting'), navigation.getParam('isEditing'));
    }

    initDS(item, isEditing) {
        console.log(JSON.stringify(item));
        let arr = [];
        let dtComponent = new DTComponent;

        let itemCloned = JSON.parse(JSON.stringify(item));
        // dtComponent.DTSetting = item.timeSetting;
        dtComponent.DTSetting = itemCloned.timeSetting;

        for (let i = 0; i < DateTimePickerModel.TimeComponents().length; i++) {
            let comp = DateTimePickerModel.TimeComponents()[i].component;
            let desc = dtComponent.description(comp);
            console.log(desc);

            arr.push({
                description: desc,
                indexPath: {section: 0, row: i},
                component: DateTimePickerModel.TimeComponents()[i].component,
                selectedItems: dtComponent.DTSetting[comp].selectedItems,
            });
        }

        // console.log(JSON.stringify(arr));

        let ds = [
            {
                title: 'Selected Items',
                data: arr,
                isEditing: isEditing,
                forRinging: item.forRinging,
                forAlarm: item.forAlarm,
                id: 0,
            },
        ];
        this.setState({ds: ds, loading: false, refresh: true});
    }

    onComponentUpdated(component, selectedItems) {
        let comp = new DTComponent;
        comp.InitializedDateTimeComponents();
        comp.DTSetting[component].selectedItems = selectedItems;
        let ds = this.state.ds;
        for (let i = 0; i < ds[0].data.length; i++) {
            if ( ds[0].data[i].component === component) {
                ds[0].data[i].selectedItems = selectedItems;
                ds[0].data[i].description = comp.description(component);
                break;
            }
        }

        return ds;
        // this.setState({ds: ds, refresh: !this.state.refresh});
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
        console.log(item);

        this.props.navigation.navigate('DateTimePicker', {
            component: item.component,
            selectedItems: item.selectedItems,
        });
    }

    confirmChange() {
        let ds = this.state.ds;
        let selectedItems = [];
        for (let i = 0; i < ds[0].data.length; i++) {
            selectedItems.push(ds[0].data[i].item);
        }
        this.props.navigation.navigate('Home');
    }

    setAlarmType = (type) => {
        let ds = this.state.ds;
        switch (type) {
            case Alarm.AlarmType.RING_ONLY:
                ds[0].forRinging = true;
                ds[0].forAlarm = false;
                break;
            case Alarm.AlarmType.NOTIFICATION_ONLY:
                ds[0].forRinging = false;
                ds[0].forAlarm = true;
                break;
            case Alarm.AlarmType.BOTH:
                ds[0].forRinging = true;
                ds[0].forAlarm = true;
                break;
        }
        this.setState({ds: ds, refresh: !this.state.refresh});
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

        const { navigation } = this.props;
        // if (navigation.getParam('DateTimeSetting')) {
        //     this.initDS(navigation.getParam('DateTimeSetting'), navigation.getParam('isEditing'));
        //     this.props.navigation.setParams({DateTimeSetting: null, isEditing: null});
        // }


        let ds;
        console.log(navigation.getParam("component"));
        console.log(navigation.getParam("selectedItems"));
        if (navigation.getParam("component")) {
            console.log("Got param component");
            ds = this.onComponentUpdated(navigation.getParam("component"), navigation.getParam("selectedItems"));
        } else {
            ds = this.state.ds;
        }

        console.log('Rendered');
        // const {ds} = this.state;
        console.log(ds[0].forRinging);
        console.log(ds[0].forAlarm);
        return (
            <View style={homeStyles.container}>
                <Loader
                    loading={this.state.loading}/>

                <View style={homeStyles.segmentSelection}>
                    <View style={[(ds[0].forRinging && ds[0].forAlarm) ? homeStyles.selectedSegment : homeStyles.unselectedSegment, homeStyles.firstSegment]}>
                        {/*<Button title='Chuông và thông báo' > </Button>*/}
                        <TouchableOpacity onPress={ this.setAlarmType.bind(this, Alarm.AlarmType.BOTH) }>
                            <Text style={homeStyles.segmentText}>Chuông và thông báo</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={(ds[0].forRinging && !ds[0].forAlarm) ? homeStyles.selectedSegment : homeStyles.unselectedSegment}>
                        {/*<Button title='Chỉ chuông' > </Button>*/}
                        <TouchableOpacity onPress={ this.setAlarmType.bind(this, Alarm.AlarmType.RING_ONLY) }>
                            <Text style={homeStyles.segmentText}>Chỉ chuông</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[(!ds[0].forRinging && ds[0].forAlarm) ? homeStyles.selectedSegment : homeStyles.unselectedSegment, homeStyles.lastSegment]}>
                        {/*<Button title='Chỉ thông báo'> </Button>*/}
                        <TouchableOpacity onPress={ this.setAlarmType.bind(this, Alarm.AlarmType.NOTIFICATION_ONLY) }>
                            <Text style={homeStyles.segmentText}>Chỉ thông báo</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <SectionList style={homeStyles.sectionList}
                             ItemSeparatorComponent={this.FlatListItemSeparator}
                             sections={ds}
                             renderItem={({item, section}) => <ListItem
                                 onPress={this.onMenuPress.bind(this, item, section)}
                                 word={item.description}
                                 isEditing={section.isEditing}/>}
                             renderSectionHeader={({section}) => <ListItem
                                 onPress={this.reset.bind(this)}
                                 isEditing={section.isEditing} word={section.title}
                                 section/>}
                             keyExtractor={(item, index) => index}
                             extraData={this.state.refresh}/>
                <View style={homeStyles.button}>
                    <CustomButton buttonStyle={{}} textStyle={{}} i18nKey={'confirm_button_title'}
                                  onPress={this.confirmChange.bind(this)}/>
                </View>
            </View>
        );
    }
}

const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    segmentSelection: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 35,
        backgroundColor: '#eeeeee',
    },
    firstSegment: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    lastSegment: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    selectedSegment: {
        flex: 3,
        borderWidth: 1,
        borderColor: '#333333',
        backgroundColor: '#0088ff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    disableSegment: {
        flex: 3,
        borderWidth: 1,
        borderColor: '#333333',
        backgroundColor: '#333333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    unselectedSegment: {
        flex: 3,
        borderWidth: 1,
        borderColor: '#333333',
        backgroundColor: 'rgba(247,247,247,0.0)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    segmentText: {
        height: '100%',
        width: '100%',
        fontSize: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    sectionList: {
        position: 'absolute',
        top: 40,
        width: '100%',
        bottom: 60,
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
        borderRadius: 15,
        position: 'absolute',
        height: 30,
        bottom: 20,
        left: 20,
        right: 20,
        overflow: 'hidden',
    },
});


export default DetailDateTimeScreen;
