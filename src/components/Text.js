import React, { Component } from 'react';
import { colors } from './Colors';
import {
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  h1: {
    fontFamily: "DINPro-Black",
    fontSize: 30,
  },
  h2: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
  },
  h3: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },
  h4: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
  },
  h5: {
    fontFamily: "DINPro-Medium",
    fontSize: 10,
  },
  h6: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  p: {
    fontFamily: "Poppins-Regular",
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
