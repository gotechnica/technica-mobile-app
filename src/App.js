import React, { Component } from 'react';
import { DefaultTheme, BottomNavigation } from 'react-native-paper';

import Home from './screens/Home';
import Mentors from './screens/Mentors';
import Profile from './screens/Profile';
import Saved from './screens/Saved';
import Schedule from './screens/Schedule';
import CustomTabBar from './components/CustomTabBar';
import { H5 } from './components/Text';
import { colors } from './components/Colors';

import Icon from 'react-native-vector-icons/SimpleLineIcons';
import ScrollableTabView from 'react-native-scrollable-tab-view';


export default class App extends Component<Props> {
  render() {
    return (
      <ScrollableTabView
        tabBarPosition="bottom"
        locked
        renderTabBar={() => <CustomTabBar />}
      >
        <Home tabLabel="home" />
        <Schedule tabLabel="calendar" />
        <Saved tabLabel="heart" />
        <Mentors tabLabel="people" />
        <Profile tabLabel="user" />
      </ScrollableTabView>
    );
  }
}
