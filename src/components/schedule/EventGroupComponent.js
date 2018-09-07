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

const styles = StyleSheet.create({});

export default class EventGroupComponent extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log('events', this.props.events);

    return (
      <PaperSheet heading={this.props.header}>
        <FlatList
          data={this.props.events}
          renderItem={eventObj => {
            event = eventObj.item;
            return (
              <EventDescription
                {...event}
                savedCount={this.props.eventManager.getSavedCount(event.key)}
              />
            );
          }}
          ItemSeparatorComponent={() => {
            return <HorizontalLine style={{ marginVertical: 10 }} />;
          }}
          keyExtractor={(event, index) => event.key.toString()}
        />
      </PaperSheet>
    );
  }
}
