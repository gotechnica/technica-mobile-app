import React, { Component } from 'react';
import { DefaultTheme, BottomNavigation } from 'react-native-paper';
import Home from './screens/Home';
import Mentors from './screens/Mentors';
import Profile from './screens/Profile';
import Saved from './screens/Saved';
import Schedule from './screens/Schedule';
import Login from './screens/Login';
import CustomTabBar from './components/CustomTabBar';
import { H5 } from './components/Text';
import { colors } from './components/Colors';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import AppContainer from './screens/AppContainer';

import {
  createStackNavigator,
} from 'react-navigation';

const App = createStackNavigator({
  Login: { screen: Login},
  AppContainer: {screen: AppContainer},
  Home: { screen: Home },
  Profile: { screen: Profile },
  Saved: { screen: Saved },
  Schedule: { screen: Schedule }
});

export default App;

