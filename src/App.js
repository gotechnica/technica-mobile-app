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
  constructor(props) {
    super(props);
    // TODO DEPRECATE DEMO DATA
    this.state = {
      events: {
        1: {
          name: 'Lunch',
          description: 'Find your own lunch',
          beginnerFriendly: false,
          time: undefined,
          savedCount: 555,
        },
        2: {
          name: 'Dinner',
          description: 'Find your own lunch',
          beginnerFriendly: false,
          time: undefined,
          savedCount: 23,
        },
        4: {
          name: 'Batista Bombs',
          description: 'Find your own lunch',
          beginnerFriendly: true,
          time: undefined,
          savedCount: 555,
        },
        3: {
          name: 'Button Making',
          description: 'Find your own lunch',
          beginnerFriendly: true,
          time: undefined,
          savedCount: 555,
        },
      },
      userInfo: {
        uid: 123456789,
        name: 'Emma Stone',
        savedEvents: {
          1: true,
          4: true,
        },
      },
    };
  }

  render() {
    return (
      <ScrollableTabView
        tabBarPosition="bottom"
        locked
        style={{ backgroundColor: colors.black}}
        renderTabBar={() => <CustomTabBar />}
      >
        <Home masterState={this.state} tabLabel="home" />
        <Schedule masterState={this.state} tabLabel="calendar" />
        <Saved masterState={this.state} tabLabel="heart" />
        <Mentors masterState={this.state} tabLabel="people" />
        <Profile masterState={this.state} tabLabel="user" />
      </ScrollableTabView>
    );
  }
}
