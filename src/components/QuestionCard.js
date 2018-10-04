import React, { Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import {colors} from "./Colors"

const styles = StyleSheet.create({
  question: {
    backgroundColor: colors.darkGrey,
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10
  },
});

export default class QuestionCard extends Component {

  renderStatus() {
    const { status } = this.props;
    if (status == "Responded!") {
      return <Text style = {{color: colors.cyan}}>Status: {status}</Text>
    } else {
      return <Text style = {{color: 'white'}}>Status: {status}</Text>
    }
  }
  render() {
    const { question } = this.props;
    return (
      <View style = {styles.question}>
        <Text style={{color: 'white'}}>Question: {question}</Text>
        {this.renderStatus()}
      </View>
    );
  }
}