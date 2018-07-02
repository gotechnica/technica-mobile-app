import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  PadContainer,
  Spacing,
  Button,
} from './Base';
import EventCard from './EventCard';

const styles = StyleSheet.create({
  columnContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  column: {
    flex: 5,
    flexDirection: 'column',
  },
  event: {
    marginBottom: 15,
  },
});

// TODO have this component take an array of events as its prop

export default EventColumns = ({ offsetLeftMargin }) => {
  const { width, height } = require('Dimensions').get('window');

  return (
    <View style={{ flex: 1 }}>
      <PadContainer style={[styles.columnContainer, { marginLeft: (offsetLeftMargin) ? -20 : 0 }, { width: width }]}>
        <View style={styles.column}>
          <EventCard name="Demo Event" saves="255" img="demo1"/>
          <EventCard name="Demo Event" saves="255" img="demo1"/>
          <EventCard name="Demo Event" saves="255" img="demo3"/>

        </View>

        <View style={{width: 20}}></View>

        <View style={styles.column}>
          <EventCard name="Demo Event" saves="255" img="demo2"/>
          <EventCard name="Demo Event" saves="255" img="demo3"/>
          <EventCard name="Demo Event" saves="255" img="demo1"/>
        </View>
      </PadContainer>
    </View>
  );
};
