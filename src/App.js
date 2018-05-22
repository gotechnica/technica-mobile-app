import React, { Component } from 'react';
import { DefaultTheme, BottomNavigation } from 'react-native-paper';

import Home from './screens/Home';
import Mentors from './screens/Mentors';
import Profile from './screens/Profile';
import Saved from './screens/Saved';
import Schedule from './screens/Schedule';

import { H5 } from './components/Text';
import { colors } from './components/Colors';

import Icon from 'react-native-vector-icons/SimpleLineIcons';


export default class App extends Component<Props> {
  state = {
    index: 0,
    routes: [
      { key: 'home', title: 'HOME', icon: 'home' },
      { key: 'schedule', title: 'SCHEDULE', icon: 'calendar' },
      { key: 'saved', title: 'SAVED', icon: 'heart' },
      { key: 'mentors', title: 'MENTORS', icon: 'people' },
      { key: 'profile', title: 'PROFILE', icon: 'user' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home: Home,
    schedule: Schedule,
    saved: Saved,
    mentors: Mentors,
    profile: Profile,
  });

  _renderIcon = ({ route, focused, tintColor }) => {
    // tintColor = (focused) ? colors.pink : tintColor;
    return (
      <Icon
        name={route.icon}
        size={22}
        color={tintColor}
      />
    )
  };

  _renderLabel = ({ route, focused, tintColor }) => {
    // tintColor = (focused) ? colors.pink : tintColor;
    return (
      <H5 style={{ textAlign: 'center', marginBottom: -4, color: tintColor }}>
        {route.title}
      </H5>
    );
  };

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
        renderLabel={this._renderLabel}
        renderIcon={this._renderIcon}
        // shifting={false}
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: '#FFFFFF',
          }
        }}
        barStyle={{
          backgroundColor: colors.white,
          borderWidth: 1,
          borderColor: '#f7f7f7',
          marginLeft: -1,
          marginRight: -1,
          marginBottom: -4,
          paddingTop: 4,
        }}
      />
    );
  }
}
