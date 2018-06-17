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

const styles = StyleSheet.create({

})

export default class EventGroup extends Component<Props> {

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

  triggerButtonPress() {
    
  }


  componentDidMount() {


  }


  render() {

  }
}
