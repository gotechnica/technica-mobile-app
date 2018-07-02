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
} from '../../components/Base'
import { H1, H2, H3, H4, P } from '../Text';


const styles = StyleSheet.create({

})

export default class EventGroup extends Component<Props> {

  constructor(props) {
    super(props);
  }

  triggerButtonPress() {

  }


  render() {
    return <H1>{this.props.header}</H1>
  }
}
