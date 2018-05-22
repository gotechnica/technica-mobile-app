import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { H1, H2, H3, H4, P } from '../components/Text';


export default class Profile extends Component<Props> {
  render() {
    return (
      <H1>Profile</H1>

    );
  }
}

const styles = StyleSheet.create({
  instructions: {
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5,
  },
});
