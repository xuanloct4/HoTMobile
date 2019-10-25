/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import Home from './screens/HomeScreen';
import ProfileScreen from './screens/Perference/ProfileScreen';

import {createStackNavigator} from 'react-navigation-stack';
import AppNavigator from './screens/AppNavigator';
import { createAppContainer } from 'react-navigation';
import React from 'react';


import { createStore } from 'redux';
import { Provider } from 'react-redux';
import appReducers from './redux/reducers';

import { connect } from 'react-redux';
import I18n from './i18n/i18n';

export const store = createStore(
    appReducers
)


import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import DefaultPreference from 'react-native-default-preference';
import * as actions from './redux/actions';

const Navigator_ = createAppContainer(AppNavigator);


class App extends React.Component {

    // state = {
    //     locale: Localization.locale,
    // };
    //
    // setLocale = locale => {
    //     this.setState({ locale });
    // };
    //
    // t = (scope, options) => {
    //     return i18n.t(scope, { locale: this.state.locale, ...options });
    // };

    constructor(props) {
        super(props);


        // I18n.locale = 'vi'
        this.state = {
            i18n: I18n
        };


        DefaultPreference.get('App Language').then(function(language) {
          console.log(language);
            this.state = {
                language: language
            };
        });
    }


    UNSAFE_componentWillMount() {
        const { language } = this.state;
        if (language) this.setMainLocaleLanguage(language);
    }

    componentDidMount() {
        const { language } = this.state;
        if (language) this.setMainLocaleLanguage(language);
    }



    UNSAFE_componentWillReceiveProps = nextProps => {
        const { language } = nextProps;
        if (language) this.setMainLocaleLanguage(language);
    }

    setMainLocaleLanguage = language => {
        let i18n = this.state.i18n;
        i18n.locale = language;
        this.setState({ i18n });
        this.props.setLanguage(language);
    }




    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <ConnectedRoot screenProps={{
                        i18n: this.state.i18n,
                        locale: this.state.locale,
                        setLocale: this.setLocale,
                    }}/>
                </View>
            </Provider>
        );
    }
}



const mapStateToProps = state => {
    return {
        language: state.languageReducer.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setLanguage: language => {
            dispatch(actions.changeLanguage(language));
        }
    }
}

const ConnectedRoot = connect(mapStateToProps, mapDispatchToProps)(Navigator_);

export default App;













// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };
//
// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });
//
// export default App;

// const AppContainer = createAppContainer(AppNavigator);
//
// const MainNavigator = createStackNavigator({
//     Home: {screen: HomeScreen},
//     Profile: {screen: ProfileScreen},
// });
//


