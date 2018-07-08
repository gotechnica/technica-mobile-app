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
} from '../Base'

import { H1, H2, H3, H4, P } from '../Text';
import { colors } from '../Colors'
import Icon from 'react-native-vector-icons/FontAwesome'

import { normalizeTimeLabel } from '../../actions/util.js';

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
});

export default class ScheduleCard extends Component<Props> {

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
    //console.log(this.props);
    return (
      <View
        style={[styles.row]}>
        <View
          style={[styles.col, {flex: 4}]}>
          <H4>
            {
              (this.props.startTime) == (this.props.endTime)
              ?
              `${normalizeTimeLabel(this.props.startTime)}`
              :
              `${normalizeTimeLabel(this.props.startTime)} - ${normalizeTimeLabel(this.props.endTime)}`
            }
          </H4>
          <H3>{this.props.title}</H3>
          <H4
            style = {{ color: colors.fontGrey}}>
              {this.props.location}
          </H4>
        </View>
        <View
          style = {[styles.row, {flex: 1}]}>
          <H3
            style = {{marginRight: 8, marginTop: 2}}>
            255
          </H3>
          <Icon
            name = {this.state.favorited ? 'heart' : 'heart-o'}
            size = {22}
            color = {colors.pink}/>
        </View>
      </View>
    );
  }

}
