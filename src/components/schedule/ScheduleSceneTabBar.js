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
        renderItem={(tabObj) => {
          const isActive = (this.props.activeTab === tabObj.index);
          return (
            <TouchableOpacity
              onPress={() => this.props.goToSection(tabObj.index)}
              style={[styles.tab, styles.tabActive]}
            >
              <H2 style={ isActive ? styles.activeText : styles.inactiveText }>{tabObj.item}&nbsp;</H2>
              {/* <View style={isActive ? styles.bottomBorder : styles.bottomBorderInactive }></View> */}
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <H2>&nbsp;&nbsp;</H2>}
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
    color: colors.white,
  },
  inactiveText: {
    color: colors.fontGrey,
  },
  // bottomBorderInactive: {
  //   // alignSelf: 'stretch',
  //   // height: 2,
  //   // marginBottom: 10,
  //   // marginTop: 2,
  // },
  // bottomBorder: {
  //   // alignSelf: 'stretch',
  //   // backgroundColor: colors.white,
  //   // height: 2,
  //   // marginTop: 2,
  //   // marginBottom: 10,
  // },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    // marginVertical: 10,
  },
  tabs: {
    flexDirection: 'row',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0
  }
});
