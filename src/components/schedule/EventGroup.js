import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';

import {
  GradientBackground,
  ViewContainer,
  PadContainer,
  Heading,
  PaperSheet,
  HorizontalLine,
} from '../Base'
import { H1, H2, H3, H4, P } from '../Text';
import EventDescription from './EventDescription';

const styles = StyleSheet.create({

});

export default class EventGroup extends Component<Props> {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.data);

    return (
      <PaperSheet
        heading = {this.props.header}>
        <FlatList
          data = {this.props.data}
          renderItem = {(eventObj => {
            return <EventDescription
              startTime = {eventObj.item.startTime}
              endTime = {eventObj.item.endTime}
              title = {eventObj.item.title}
              location = {eventObj.item.location}
            />
          })}
          ItemSeparatorComponent = {() => {
            return (
              <HorizontalLine
                style = {{marginVertical: 10}}
              />)
          }}
          keyExtractor = {(item, index) => item.key.toString()}
        />
      </PaperSheet>
    )
  }
}
