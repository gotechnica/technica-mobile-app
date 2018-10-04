import React, { Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { H4, H6 } from "./Text"

import {colors} from "./Colors"

const styles = StyleSheet.create({
  question: {
    // backgroundColor: colors.darkGrey,
    paddingBottom: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.borderGrey,
    // paddingLeft: 20,
    // paddingRight: 20,
    // marginBottom: 10
  },
});

export default class QuestionCard extends Component {

  renderStatus() {
    const { status } = this.props;
    if (status == "Responded!") {
      return <H6 style = {{color: colors.cyan}}>{status}</H6>
    } else {
      return <H6 style = {{color: 'white'}}>{status}</H6>
    }
  }
  render() {
    const { question } = this.props;
    return (
      <View style = {styles.question}>
        <H4 style={{color: 'white'}}>Question: {question}</H4>
        {this.renderStatus()}
      </View>
    );
  }
}
