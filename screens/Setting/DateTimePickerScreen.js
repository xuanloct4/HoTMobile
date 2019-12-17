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
import DateTimePickerModel from './DateTimePickerModel';
import DTComponent from './DTComponent';
import Loader from '../../components/Loader';
import CustomButton from '../../components/CustomButton';
import I18n from '../../i18n/i18n';

class ListItem extends React.Component {
    render() {
        const {onPress, onDelete, section, word, isEditing, isChecked, hasDetail, hasInfo} = this.props;
        const {sectionStyle, termStyle} = listItemStyles;
        if (section) {
            let resetWord = 'Reset';
            return (
                <View style={listItemStyles.sectionStyle}>
                    <Text style={listItemStyles.sectionTitleStyle} numberOfLines={1}>{word}</Text>
                    <View style={listItemStyles.sectionRightButtonStyle}>
                        <TouchableOpacity onPress={onPress}>
                            <Text style={listItemStyles.sectionRightTextStyle} numberOfLines={1}>{resetWord}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else {
            if (isChecked) {
                return (
                    <TouchableOpacity
                        onPress={onPress}>
                        <View style={listItemStyles.itemStyle}>
                            <Text style={[listItemStyles.titleStyle, listItemStyles.leftTitleUnEditing]} numberOfLines={1}>{word}</Text>
                            <Image style={listItemStyles.rightIconStyle}
                                   source={require('../../assets/images/ic_check.png')}/>
                        </View>
                    </TouchableOpacity>
                );
            } else {
                return (
                    <TouchableOpacity
                        onPress={onPress}>
                        <View style={listItemStyles.itemStyle}>
                            <Text style={[listItemStyles.titleStyle, listItemStyles.leftTitleUnEditing]} numberOfLines={1}>{word}</Text>
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
        height: 44,
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

class DateTimePickerScreen extends React.Component {
    static navigationOptions = ({screenProps: {i18n, locale}}) => ({
        title: I18n.t('time_picker_screen_title'),
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
        const {navigation} = this.props;
        console.log(navigation.getParam('selectedItems'));
        this.props.navigation.navigate('DetailDateTime', {});
        return true;
    }

    UNSAFE_componentWillMount() {
        this.setState({popoverIsOpen: false});


        console.log('Componenet Will Mount');
       this.reset();
    }

    reset() {
        const {navigation} = this.props;
        this.initDS(navigation.getParam('component'), navigation.getParam('selectedItems'));
    }

    initDS(component, selectedItems) {
        let selectedItemsCloned = JSON.parse(JSON.stringify(selectedItems));
        let arr = [];
        for (let i = 0; i < selectedItemsCloned.length; i++) {

            arr.push({
                indexPath: {section: 0, row: i},
                item: selectedItemsCloned[i],
            });
        }

        // console.log(JSON.stringify(arr));

        let ds = [{
            title: 'Selected Items',
            data: arr,
            component: component,
            id: 0,
        }];
        this.setState({ds: ds, loading: false, refresh: true});
    }

    onSelect(item, section) {
        // console.log(item);
        let ds = this.state.ds;
        // console.log(ds);
        for (let i = 0; i < ds[0].data.length; i++) {
            if (ds[0].data[i].indexPath.row == item.indexPath.row) {
                ds[0].data[i].item.isSelected = !ds[0].data[i].item.isSelected;
            }
        }
        this.setState({ds: ds, refresh: !this.state.refresh});
    }

    onSelectAll() {
        console.log('Unselect All');
        let ds = this.state.ds;
        for (let i = 0; i < ds[0].data.length; i++) {
            ds[0].data[i].item.isSelected = true;
        }
        this.setState({ds: ds, refresh: !this.state.refresh});
    }

    onUnselect() {
        console.log('Select All');
        let ds = this.state.ds;
        for (let i = 0; i < ds[0].data.length; i++) {
            ds[0].data[i].item.isSelected = false;
        }
        this.setState({ds: ds, refresh: !this.state.refresh});
    }

    confirmChange() {
        let ds = this.state.ds;
        let selectedItems = [];
        for (let i = 0; i < ds[0].data.length; i++) {
            selectedItems.push(ds[0].data[i].item);
        }

        this.props.navigation.navigate('DetailDateTime', {component: ds[0].component, selectedItems: selectedItems});
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
        let selectedDiscreteValues = ds[0].data.filter(item => item.item.isSelected === true);
        let unselectedDiscreteValues = ds[0].data.filter(item => item.item.isSelected === false);
        if (selectedDiscreteValues.length == 0 && unselectedDiscreteValues.length > 0) {
            console.log('All are unseletce');
        }
        if (unselectedDiscreteValues.length == 0 && selectedDiscreteValues.length > 0) {
            console.log('All are selected');
        }
        return (
            <View style={homeStyles.container}>
                <Loader
                    loading={this.state.loading}/>

                <View style={homeStyles.segmentSelection}>
                    <View
                        style={[(unselectedDiscreteValues.length == 0 && selectedDiscreteValues.length > 0) ? homeStyles.selectedButton : homeStyles.unselectButton, homeStyles.firstSegment]}>
                        <TouchableOpacity onPress={this.onSelectAll.bind(this)}>
                            <Text style={{
                                height: '100%',
                                width: '100%',
                                fontSize: 10,
                                textAlign: 'center',
                                textAlignVertical: 'center',
                            }}>Select All</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={[(selectedDiscreteValues.length == 0 && unselectedDiscreteValues.length > 0) ? homeStyles.selectedButton : homeStyles.unselectButton, homeStyles.lastSegment]}>
                        <TouchableOpacity onPress={this.onUnselect.bind(this)}>
                            <Text style={{
                                height: '100%',
                                width: '100%',
                                fontSize: 10,
                                textAlign: 'center',
                                textAlignVertical: 'center',
                            }}>De-Select All</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <SectionList style={homeStyles.sectionList}
                             ItemSeparatorComponent={this.FlatListItemSeparator}
                             sections={ds}
                             renderItem={({item, section}) => <ListItem onPress={ this.onSelect.bind(this, item) }
                                                                        word={item.item.value}
                                                                        isChecked={item.item.isSelected}/>}
                             renderSectionHeader={({section}) => <ListItem isEditing={section.isEditing}
                                                                           onPress={ this.reset.bind(this) }
                                                                           word={section.title}
                                                                           section/>}
                             keyExtractor={(item, index) => index}
                             extraData={this.state.refresh}/>

                <View style={homeStyles.button}>
                    <CustomButton i18nKey={'confirm_button_title'}
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
    segmentSelection: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 35,
        backgroundColor: '#eeeeee',
    },
    selectedButton: {
        flex: 3,
        borderWidth: 1,
        borderColor: '#333333',
        backgroundColor: '#0088ff',
    },
    unselectButton: {
        flex: 3,
        borderWidth: 1,
        borderColor: '#333333',
        backgroundColor: 'rgba(247,247,247,0.0)',
    },
    firstSegment: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    lastSegment: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
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

export default DateTimePickerScreen;
