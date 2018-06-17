import React, { Component } from 'react';
import { colors } from './Colors';
import { H1, H2, H3, H4, P } from './Text';
import { Paper } from 'react-native-paper';
import {
  View,
  Platform,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    // backgroundColor: colors.white,
  },
  padContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  modal: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  spacing: {
    height: 15,
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
  white: {
    backgroundColor: 'white',
  },
  horizontalLine: {
    height: 1,
    backgroundColor: colors.borderGrey,
  },
  modalHeader: {
    marginTop: 20,
  },
  modalHeadingText: {
    marginTop: 20,
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.lavender,
    padding: 8,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.lavender,
  },
});


const ViewContainer = (props) => (
  <ScrollView style={{ flex: 1 }}>
    <View style={[styles.container, props.style]}>
      {props.children}
    </View>
  </ScrollView>
);

const PadContainer = (props) => (
    props.white ?
    <View style={[styles.padContainer, styles.white, props.style]}>
      {props.children}
    </View>
    :
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
        <HorizontalLine/>
      </View>
      :
      null
    }
    <View style={styles.paperBody}>
      {props.children}
    </View>
  </Paper>
);

const HorizontalLine = (props) => (
  <View style={styles.horizontalLine}></View>
);

const GradientBackground = (props) => (
  <ImageBackground
    style={styles.bg}
    source={require('../../assets/imgs/bg.png')}
  >
    {props.children}
  </ImageBackground>
);

const Spacing = (props) => (
  <View style={styles.spacing}></View>
);

const ModalContent = (props) => (
  <View style={styles.modal}>
    {props.children}
  </View>
)

const ModalHeader = (props) => (
  <View style={styles.modalHeader}>
    <TouchableOpacity onPress={props.onBackButtonPress}>
      <Icon
        name="arrow-left"
        size={22}
        color={"black"}
      />
    </TouchableOpacity>
    <H2 style={styles.modalHeadingText}>{props.heading}</H2>
  </View>
);

const Button = (props) => (
  <View style={{ backgroundColor: 'white' }}>
    <View style={styles.button}>
      <H3 style={styles.buttonText}>
        {props.text}
      </H3>
    </View>
  </View>
)

export {
  ViewContainer,
  Heading,
  SubHeading,
  PaperSheet,
  PadContainer,
  GradientBackground,
  HorizontalLine,
  Spacing,
  ModalContent,
  ModalHeader,
  Button
};
