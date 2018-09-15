import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { H1, H2, H3, H4, P } from '../components/Text';
import {
  ViewContainer,
  Heading,
  SubHeading,
  PaperSheet,
  PadContainer,
} from '../components/Base';
import EventCard from '../components/EventCard';
import EventDescription from '../components/schedule/EventDescription';

export default class Saved extends Component<Props> {
  render() {
    return (
      <ViewContainer>
        <PadContainer>
          <Heading>
            Saved
          </Heading>
          <SubHeading>
            12 events saved
          </SubHeading>
        </PadContainer>

        <PadContainer>
          <EventCard
            title="Chicken Little"
            savedCount="155"
            img="demo4"
            big
            style={styles.eventCard}
          />

          <EventCard
            title="Chicken Little"
            savedCount="155"
            img="demo5"
            big
            style={styles.eventCard}
          />

          <EventCard
            title="Chicken Little"
            savedCount="155"
            img="demo2"
            big
            style={styles.eventCard}
          />

          <EventCard
            title="Chicken Little"
            savedCount="155"
            img="demo4"
            big
            style={styles.eventCard}
          />
        </PadContainer>

      </ViewContainer>
    );
  }
}

const styles = StyleSheet.create({
  eventCard: {
    marginBottom: 20,
  },
});
