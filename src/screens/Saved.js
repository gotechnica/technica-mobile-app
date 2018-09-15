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
    const events = eventManager.getTopEvents(10);

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
          {
            /* TODO replace this with the user's saved events, ordering them by ascending time */
            events.map((event) => (
              <EventCard
                {...event}
                savedCount={eventManager.getSavedCount(event.key)}
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
