import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  FlatList
} from 'react-native';

import { colors } from '../Colors';
import { H1, H2, H3, H4, P } from '../Text';

export default class ScheduleSceneTabBar extends Component {
  render() {
    return (
      <FlatList
        style={[styles.tabs, this.props.style]}
        data={this.props.tabs}
        renderItem={tabObj => {
          return (
            <TouchableOpacity
              onPress={() => this.props.goToSection(tabObj.index)}
              style={[styles.tab, styles.tabActive]}
            >
              <H2 style={styles.activeText}>{tabObj.item}</H2>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => {
          return (
            <H2
              style={[
                styles.activeText,
                {
                  marginHorizontal: 10,
                  marginVertical: 10
                }
              ]}
            >
              |
            </H2>
          );
        }}
        horizontal={true}
        keyExtractor={(item, index) => item}
      />
    );
  }
}

ScheduleSceneTabBar.propTypes = {
  goToPage: PropTypes.func,
  activeTab: PropTypes.number,
  tabs: PropTypes.array
};

const styles = StyleSheet.create({
  activeText: {
    fontSize: 20,
    color: colors.pink
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  tabs: {
    flexDirection: 'row',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0
  }
});
