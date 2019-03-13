import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import moment from 'moment';

import { colors } from './Colors';
import { P } from './Text';

const hackingIsOver = moment().isAfter(moment("2019-04-14 09:00"));

let LABELS = ["Home", "Schedule"];

if (hackingIsOver) {
  LABELS.push("Expo");
}

LABELS.push("Mentors", "Profile");

class CustomTabBar extends Component {
  render() {
    return (
      <View style={[styles.tabs, this.props.style]}>
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
                  this.props.activeTab === i
                    ? colors.primaryColor
                    : colors.textColor.light
                }
              />
              <P
                style={
                  this.props.activeTab === i
                    ? [styles.tabText, styles.tabActiveText]
                    : [styles.tabText]
                }
              >
                {LABELS[i]}
              </P>
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
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 12,
    paddingBottom: 10
  },
  tabText: {
    marginTop: 4,
    color: colors.textColor.light
  },
  tabActiveText: {
    color: colors.primaryColor
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: colors.backgroundColor.light
  }
});

export default CustomTabBar;
