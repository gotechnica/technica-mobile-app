import React, { Component } from 'react';

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
      <PaperSheet heading={this.props.header}>
        <FlatList
          data={this.props.events}
          renderItem={eventObj => {
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
            return <HorizontalLine style={{ marginVertical: 10 }} />;
          }}
          keyExtractor={(event, index) => event.eventID.toString()}
        />
      </PaperSheet>
    );
  }
}
