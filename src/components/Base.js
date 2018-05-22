import React, { Component } from 'react';
import { colors } from './Colors';
import { H1, H2, H3, H4, P } from './Text';
import { Paper } from 'react-native-paper';
import {
  View,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  padContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
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
    elevation: Platform.OS === 'ios' ? 4 : 6,
    borderRadius: 4,
    // shadowColor: 'rgba(0, 0, 0, .6)',
    shadowOpacity: .18,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 2,
  },
  paperHead: {
    padding: 15,
  },
  paperBody: {
    padding: 15,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: colors.borderGrey,
  }
});


const ViewContainer = (props) => (
  <ScrollView style={{ flex: 1 }}>
    <View style={[styles.container, props.style]}>
      {props.children}
    </View>
  </ScrollView>
);

const PadContainer = (props) => (
  <View style={[styles.padContainer, props.style]}>
    {props.children}
  </View>
)

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
    {
      props.heading ?
      <View>
        <H2 style={styles.paperHead}>
          {props.heading}
        </H2>
        <View style={styles.horizontalLine}></View>
      </View>
      :
      null
    }
    <View style={styles.paperBody}>
      {props.children}
    </View>
  </Paper>
);

export {
  ViewContainer,
  Heading,
  SubHeading,
  PaperSheet,
  PadContainer
};
