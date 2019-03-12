import React, { Component, Fragment } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const badgeColors = {
  red: '255, 59, 48',
  yellow: '255, 149, 0',
  green: '79, 217, 100',
  blue: '0, 122, 255',
  purple: '208, 40, 255'
};

const opacity = ', 0.2';

const badgeStyle = {
  red: { bgColor: 'rgba(' + badgeColors.red + opacity + ')', text: 'rgb(' + badgeColors.red + ')' },
  yellow: { bgColor: 'rgba(' + badgeColors.yellow + opacity + ')', text: 'rgb(' + badgeColors.yellow + ')' },
  green: { bgColor: 'rgba(' + badgeColors.green + opacity + ')', text: 'rgb(' + badgeColors.green + ')' },
  blue: { bgColor: 'rgba(' + badgeColors.blue + opacity + ')', text: 'rgb(' + badgeColors.blue + ')' },
  purple: { bgColor: 'rgba(' + badgeColors.purple + opacity + ')', text: 'rgb(' + badgeColors.purple + ')' }
};

const badgeStyles = {
  'Main': badgeStyle.green,
  'Food': badgeStyle.red,
  'Misc': badgeStyle.purple,
  'Sponsor': badgeStyle.blue,
  'Mentor': badgeStyle.blue,
  'Campfire': badgeStyle.yellow
};

const styles = StyleSheet.create({
  width: {
    alignSelf: 'flex-start',
    borderRadius: 3
  },
  modal: {
    marginTop: 3
  },
  description: {
    marginTop: 5
  },
  text: {
    fontWeight: 'bold',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 1,
    paddingBottom: 1
  }
});

export default class PillBadge extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[(this.props.from === 'Modal' ? styles.modal : styles.description), styles.width,{backgroundColor: badgeStyles[this.props.category].bgColor}]}>
        <Text style={[styles.width,styles.text,{color: badgeStyles[this.props.category].text}]}>
            {(this.props.category === 'Misc' ? 'miscellaneous' : this.props.category).toUpperCase()}
        </Text>
      </View>
    );
  }
}
