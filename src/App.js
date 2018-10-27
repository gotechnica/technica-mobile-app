import React, { Component } from 'react';
import { DefaultTheme, BottomNavigation } from 'react-native-paper';
import { YellowBox, AsyncStorage, ActivityIndicator } from 'react-native';
import Home from './screens/Home';
import Mentors from './screens/Mentors';
import Saved from './screens/Saved';
import Schedule from './screens/Schedule';
import Login from './screens/Login';
import CustomTabBar from './components/CustomTabBar';
import { H5 } from './components/Text';
import { colors } from './components/Colors';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import AppContainer from './screens/AppContainer';
import {View} from 'react-native'
import { createStackNavigator} from 'react-navigation';
import { ViewContainer, CenteredActivityIndicator } from './components/Base';

// NOTE dangerously ignore deprecated warning for now
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: undefined,
    }
  }

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem("USER_DATA_STORE");
      if (value !== null) {
        this.setState({
          isLoggedIn: true,
        });
      } else {
        this.setState({
          isLoggedIn: false,
        });
      }
    } catch (error) {
       console.log(error);
    }
  }

  render() {
    if (this.state.isLoggedIn === undefined) {
      return (
        <CenteredActivityIndicator/>
      );
    } else {

      let initialPage;

      if (this.state.isLoggedIn === false) {
        initialPage = 'Login';
      } else {
        initialPage = 'AppContainer';
      }

      const AppNavigator = createStackNavigator({
        Login: { screen: Login},
        AppContainer: { screen: AppContainer},
      }, {
        initialRouteName: initialPage
      });

      return <AppNavigator screenProps={this.props}/>;
    }
  }
}
