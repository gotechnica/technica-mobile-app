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
    const { eventManager } = this.props;
    const events = eventManager.getSavedEventsArray();

    return (
      <ViewContainer>
        <PadContainer>
          <Heading>
            Saved
          </Heading>
          <SubHeading>
            {events.length} events saved
          </SubHeading>
        </PadContainer>

        <PadContainer>
          {
            events.map((event) => (
              <EventCard
                key={event.eventID}
                event = {event}
                eventManager={eventManager}
                big
                style={styles.eventCard}
              />

            ))
          }
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
