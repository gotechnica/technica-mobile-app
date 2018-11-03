import React, { Component, Fragment } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { H4, H5, H6 } from "./Text";
import moment from 'moment';
import { colors } from "./Colors";
import AnimatedEllipsis from 'react-native-animated-ellipsis';

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
    if (status.includes("claimed")) {
      return <H6 style={{color: colors.cyan}}>{status}</H6>
    } else {
      return <Fragment>
        <H6 style={{ color: colors.lavender }}>{status}<AnimatedEllipsis style={{ fontSize: 12, marginLeft: -4 }}/></H6>
      </Fragment>
    }
  }
  render() {
    const { question, location, time } = this.props;
    console.log("MY PROPS", this.props);
    return (
      <View style = {styles.question}>
        <H4 style={{color: colors.white}}>"{question}"</H4>
        <H4 style={{color: colors.fontGrey, marginBottom: 10}}>{location}</H4>
        {/* // <H6 style={{color: colors.fontGrey, marginBottom: 10}}>{moment(time).format("h:mma, dddd")}</H6> */}
        {this.renderStatus()}
      </View>
    );
  }
}

// Deprecated until fixed, causes memory leaks
// class AnimatedEllipsis extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       txt: '...'
//     }
//   }
//
//   componentDidMount() {
//     this.timerId = setInterval(() => {
//       const newTxt = this.state.txt === ' . . .' ? '' : (this.state.txt === '') ? ' .' : (this.state.txt === ' .') ? ' . .' : (this.state.txt === ' . .') ? ' . . .' : '';
//       this.setState({ txt: newTxt});
//     }, 600);
//   }
//
//   componentWillUnmount() {
//     clearInterval(this.timerID);
//   }
//
//   render() {
//     return <H6 style={{ color: colors.lavender }}>{`${this.props.status}${this.state.txt}`}</H6>;
//   }
// }
