import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  GradientBackground,
  ViewContainer,
  PadContainer,
  Heading,
} from '../components/Base'

import { H1, H2, H3, H4, P } from '../Text';


import colors from '../components/Colors'

import Icon from 'react-native-vector-icons/FontAwesome'


import { H1, H2, H3, H4, P } from '../components/Text';


const styles = StyleSheet.create({
  column: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
});

export default class Eventcard extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = {
      favorited: false
    };

    // this.customizeNotification = this.props.customizeNotification;
    // this.scheduleNotification = this.props.scheduleNotification;

    // AsyncStorage.getItem(EVENT_FAVORITED_KEY_PREFIX + this.props.eventKey.toString(), (err, results) => {
    //   //retrieve whether the event was favorited and update state to reflect change
    //   if(results != null && results != 'null'){
    //     console.log("myId: " + this.props.eventKey.toString() + " isFavorited: " + results)
    //     this.setState((prevState, props) => {return {favorited : JSON.parse(results)}});
    //   } else {
    //     this.setState((prevState, props) => {return {favorited : false}});
    //
    //     //update status to not favorited
    //     AsyncStorage.setItem(EVENT_FAVORITED_KEY_PREFIX + this.props.eventKey.toString(), JSON.stringify(false), function(error){
    //       if(error){
    //         console.log(error);
    //       }
    //     });
    //   }
    // });
  }

  render() {
    return (
      <View
        style=[{styles.row}]>
        <View
          style=[{styles.col}, {flex: 4}]>
          <H4>
            {
              (this.props.startTimeFormatted) == (this.props.endTimeFormatted)
              ?
              `${this.props.startTimeFormatted}`
              :
              `${this.props.startTimeFormatted} - ${this.props.endTimeFormatted}`
            }
          </H4>
          <H3>{this.props.title}</H3>
          <P>{this.props.location}</P>
        </View>
        <View
          style = [{styles.row}, {flex: 1}]>
          <H3>255</H3>
          <Icon
            name = {this.state.favorited ? 'heart' : 'heart-o'}
            size = {30}
            color = {colors.pink}
            }
          </Icon>
      </View>
    )
  }

}
