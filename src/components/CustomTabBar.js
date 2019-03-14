import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo'
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
          let color = (this.props.activeTab === i ? colors.primaryColor : colors.textColor.light);
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => this.props.goToPage(i)}
              style={styles.tab}
            >
            {
              {
                'home': <FontAwesome name='home' size={35} color={color}/>,
                'schedule': <EvilIcon name='calendar' size={45} color={color}/>,
                'expo': <Entypo name='code' size={34} color={color}/>,
                'mentors': <Ionicon name='ios-people' size={45} color={color} style={{marginBottom: -5,marginTop: -6}}/>,
                'profile': <Ionicon name='ios-person' size={35} color={color}/>
              }[tab]
            }
              <P
                style={
                  this.props.activeTab === i
                    ? [(tab === 'mentors' ? styles.tabTextMentors: styles.tabText), styles.tabActiveText]
                    : [(tab === 'mentors' ? styles.tabTextMentors: styles.tabText)]
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
    paddingTop: 8,
    paddingBottom: 8
  },
  tabText: {
    marginTop: 3,
    color: colors.textColor.light
  },
  tabTextMentors: {
    marginTop: 3,
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
