import React, { Component, Fragment } from 'react';

import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';

import {
  GradientBackground,
  ViewContainer,
  PadContainer,
  Heading,
  PaperSheet,
  HorizontalLine
} from '../Base';
import { H1, H2, H3, H4, P } from '../Text';
import EventDescription from './EventDescription';

export default class EventGroupComponent extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
      <H2 style={styles.header}>{this.props.header}</H2>
        <FlatList
          data={this.props.events}
          renderItem={ (eventObj) => {
            event = eventObj.item;
            return (
              <EventDescription
                event = {event}
                disabled={event.hasPassed}
                eventManager={this.props.eventManager}
              />
            );
          }}
          ItemSeparatorComponent={() => {
            return <View style={{height: 1.5, backgroundColor: '#e3e3e8'}}></View>;
          }}
          keyExtractor={(event, index) => event.eventID.toString()}
        />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingLeft: 15,
    paddingBottom: 5,
    paddingTop: 5,
    color: 'black',
    backgroundColor: '#f7f7f7'
  }
});
