import React, { Component } from 'react';
import { colors } from './Colors';
import { H1, H2, H3, H4, P } from './Text';
import { Paper } from 'react-native-paper';
import {
  View,
  Platform,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  heading: {
    paddingTop: 60,
    marginBottom: 15,
  },
  subHeading: {
    color: colors.fontGrey,
    marginBottom: 25,
  },
  paper: {
    padding: 20,
    elevation: Platform.OS === 'ios' ? 4 : 6,
    borderRadius: 4,
    // shadowColor: 'rgba(0, 0, 0, .6)',
    shadowOpacity: .18,
  },
});


const ViewContainer = (props) => (
  <View style={[styles.container, props.style]}>
    {props.children}
  </View>
);

const Heading = (props) => (
  <View style={[styles.heading, props.style]}>
    <H1>
      {props.children}
    </H1>
  </View>
);

const SubHeading = (props) => (
  <View style={[props.style]}>
    <H2 style={styles.subHeading}>
      {props.children}
    </H2>
  </View>
);

const PaperSheet = (props) => (
  <Paper style={styles.paper}>
    {props.children}
  </Paper>
);

export {
  ViewContainer,
  Heading,
  SubHeading,
  PaperSheet
};
