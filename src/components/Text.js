import React, { Component } from 'react';
import { colors } from './Colors';
import {
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: colors.textColor.normal,
  },
  h1: {
    color: colors.primaryColor,
    fontFamily: "Aleo-Bold",
    fontSize: 36,
  },
  h2: {
    fontFamily: "AvenirLTStd-Black",
    fontSize: 18,
  },
  h3: {
    fontFamily: "AvenirLTStd-Medium",
    fontSize: 14,
  },
  h4: {
    fontFamily: "AvenirLTStd-Medium",
    fontSize: 12,
  },
  h5: {
    fontFamily: "Aleo-Regular",
    fontSize: 10,
  },
  h6: {
    fontFamily: "AvenirLTStd-Book",
    fontSize: 12,
  },
  p: {
    fontFamily: "AvenirLTStd-Book",
    fontSize: 14,
  },
});


const H1 = (props) => (
  <Text style={[styles.text, styles.h1, props.style]}>
    {props.children}
  </Text>
);

const H2 = (props) => (
  <Text style={[styles.text, styles.h2, props.style]}>
    {props.children}
  </Text>
);

const H3 = (props) => (
  <Text style={[styles.text, styles.h3, props.style]}>
    {props.children}
  </Text>
);

const H4 = (props) => (
  <Text style={[styles.text, styles.h4, props.style]}>
    {props.children}
  </Text>
);

const H5 = (props) => (
  <Text style={[styles.text, styles.h5, props.style]}>
    {props.children}
  </Text>
);

const H6 = (props) => (
  <Text style={[styles.text, styles.h6, props.style]}>
    {props.children}
  </Text>
);

const P = (props) => (
  <Text style={[styles.text, styles.p, props.style]}>
    {props.children}
  </Text>
);


export { H1, H2, H3, H4, H5, H6, P }
