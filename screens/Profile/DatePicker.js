import React from 'react';
import {Alert, FlatList, Modal, Picker, SectionList, Text, TouchableOpacity, View} from 'react-native';
import CustomTextView from '../../components/CustomTextView';


class DatePickerModel {
    static dateComponent = {
        SECOND: 'second',
        MINUTE: 'minute',
        HOUR: 'hour',
        DAY: 'day',
        DAYSOFWEEK: 'daysOfWeek',
        MONTH: 'month',
        YEAR: 'year'
    };

    static daysOfWeek = {
        MONSDAY: 'Monsday',
        TUESDAY: 'Tuesday',
        WEDNESDAY: 'Wednesday',
        THIRSDAY: 'Thursday',
        FRIDAY: 'Friday',
        SATURDAY: 'Saturday',
        SUNDAY: 'SUNDAY',
    }

    static secondRange = {
        MIN: 0,
        MAX: 60,
    }

    static minuteRange = {
        MIN: 0,
        MAX: 60,
    }

    static hourRange = {
        MIN: 0,
        MAX: 23,
    }

    static dayRange = {
        MIN: 0,
        MAX: 31,
    }

    static monthRange = {
        MIN: 1,
        MAX: 12,
    }




}

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
