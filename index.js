/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// import App2 from './screens/Home';
// import { createStackNavigator, createAppContainer } from 'react-navigation';
// import Home from './screens/Home';
// import Example1 from './screens/Example1';
// import Example2 from './screens/Example2';
// import Example3 from './screens/Example3';
// import Example4 from './screens/Example4';
// import Example5 from './screens/Example5';
// import Example6 from './screens/Example6';
// import Example7 from './screens/Example7';
// import Example8 from './screens/Example8';
//
// import TableViewExampleCell from './cells/TableViewExampleCell';





// const Stack = createStackNavigator(
//     {
//         home: {
//             screen: Home,
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

// const App2 = createAppContainer(Stack);
// AppRegistry.registerComponent(
//     'TableViewExampleCell',
//     () => TableViewExampleCell
// );



AppRegistry.registerComponent(appName, () => App);


