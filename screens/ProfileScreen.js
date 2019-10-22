import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    StatusBar,
    SectionList,
    Alert,
} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
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
        title: 'Profile',
    };

    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    sections={[
                        {title: 'D', data: ['Profile']},
                        {title: 'J', data: ['Devices Manage', 'Boards Manage', 'Account Manage']},
                        {title: 'J', data: ['Term & Condition', 'About']},
                        {title: 'J', data: ['Logout']},
                    ]}
                    renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
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


// const MainTableView = ({navigation}) => {
//     const {navigate} = navigation;
//
//     return (<TableView
//                 style={{flex: 1}}
//                 tableViewStyle={TableView.Consts.Style.Grouped}
//                 tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}>
//                 <Section arrow>
//                     <Item onPress={() => navigate('sections')}>Multiple sections</Item>
//                     <Item onPress={() => navigate('accessories')}>Accessory Types</Item>
//                     <Item onPress={() => navigate('json')}>App bundled JSON data</Item>
//                     <Item onPress={() => navigate('network')}>
//                         Large Network Loaded List
//                     </Item>
//                     <Item onPress={() => navigate('custom')}>Custom Cells</Item>
//                     <Item onPress={() => navigate('edit', {editing: true})}>
//                         Editing mode
//                     </Item>
//                     <Item onPress={() => navigate('refresh')}>Pull to Refresh</Item>
//                     <Item onPress={() => navigate('index')}>Scroll To Index</Item>
//                 </Section>
//             </TableView>);
// };
//
//
//
// const ProfileScreen = createStackNavigator(
//     {
//         home: {
//             screen: MainTableView,
//             navigationOptions: {
//                 title: 'TableView Examples',
//             },
//         },
//         sections: {
//             screen: Example1,
//             navigationOptions: {
//                 title: 'Multiple Sections',
//             },
//         },
//         accessories: {
//             screen: Example2,
//             navigationOptions: {
//                 title: 'Accessory Types',
//             },
//         },
//         json: {
//             screen: Example3,
//             navigationOptions: {
//                 title: 'Bundled JSON',
//             },
//         },
//         network: {
//             screen: Example4,
//             navigationOptions: {
//                 title: 'Large Network Loaded List',
//             },
//         },
//         custom: {
//             screen: Example5,
//             navigationOptions: {
//                 title: 'Custom Cells',
//             },
//         },
//         edit: {
//             screen: Example6,
//             navigationOptions: {
//                 title: 'Editing Mode',
//             },
//         },
//         refresh: {
//             screen: Example7,
//             navigationOptions: {
//                 title: 'Pull to Refresh',
//             },
//         },
//         index: {
//             screen: Example8,
//             navigationOptions: {
//                 title: 'Scroll to Index',
//             },
//         },
//     },
//     {
//         defaultNavigationOptions: {
//             headerStyle: {
//                 backgroundColor: '#47A1D7',
//             },
//             headerTintColor: '#fff',
//         },
//         initialRouteName: 'home',
//     }
// );

export default ProfileScreen;
