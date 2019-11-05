import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';

import { H5 } from './Text';
import { colors } from './Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const LABELS = ['Home', 'Schedule', 'Profile', 'Saved', 'Help']

const ICONS = {
  'home': 'home',
  'schedule': 'calendar',
  'profile': 'qrcode',
  'map': 'map',
  'help': 'help',
};

class CustomTabBar extends Component {
  render() {
    return (
      <View style={[styles.tabs, this.props.style, ]}>
        {this.props.tabs.map((tab, i) => {
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => this.props.goToPage(i)}
              style={styles.tab}
            >
              <Icon
                name={tab}
                size={20}
                color={
                  this.props.activeTab === i ?
                    colors.white
                    :
                    colors.fontGrey}
              />
              <H5
                style={
                  this.props.activeTab === i ?
                    [styles.tabText, styles.tabActiveText]
                    :
                    [styles.tabText]
                  }
              >
                {LABELS[i].toUpperCase()}
              </H5>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 10,
  },
  tabText: {
    marginTop: 4,
    color: colors.fontGrey,
  },
  tabActiveText: {
    color: colors.white,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.darkGrey,
  },
});

export default CustomTabBar;
