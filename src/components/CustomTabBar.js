import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import { colors } from './Colors';
import { P } from './Text';

const LABELS = ["Home", "Schedule", /*"Saved",*/ "Mentors", "Profile"];

class CustomTabBar extends Component {
  render() {
    return (
      <View style={[styles.tabs, this.props.style]}>
        {this.props.tabs.map((tab, i) => {
          let color = (this.props.activeTab === i ? colors.primaryColor : colors.textColor.light);
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => this.props.goToPage(i)}
              style={styles.tab}
            >
            {
              {
                'home': <FontAwesome name='home' size={30} color={color}/>,
                'schedule': <EvilIcon name='calendar' size={40} color={color}/>,
                'mentors': <Ionicon name='ios-people' size={40} color={color}/>,
                'profile': <Ionicon name='ios-person' size={35} color={color}/>
              }[tab]
            }
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
