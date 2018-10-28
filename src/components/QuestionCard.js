import React, { Component, Fragment } from 'react';
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
    if (status.includes("Responded")) {
      return <H6 style={{color: colors.cyan}}>{status}</H6>
    } else {
      return <AnimatedEllipsis status={status}/>
    }
  }
  render() {
    const { question } = this.props;
    return (
      <View style = {styles.question}>
        <H4 style={{color: 'white'}}>{question}</H4>
        {this.renderStatus()}
      </View>
    );
  }
}

class AnimatedEllipsis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txt: '...'
    }
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      const newTxt = this.state.txt === '. . .' ? '' : (this.state.txt === '') ? '.' : (this.state.txt === '.') ? '. .' : (this.state.txt === '. .') ? '. . .' : '';
      this.setState({ txt: newTxt});
    }, 600);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return <H6 style={{ color: colors.lavender }}>{`${this.props.status}${this.state.txt}`}</H6>;
  }
}
