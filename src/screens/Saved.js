import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
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
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default class Saved extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
    };
  }

  render() {
    const { eventManager } = this.props;
    const events = eventManager.getSavedEventsArray();

    return (
      <ScrollView>
        <PadContainer>
          <View style={styles.headingRow}>
            <Heading>
              Saved
            </Heading>
            <TouchableOpacity onPress={() => {this.setState({ refresh: !this.state.refresh })}}>
              <Icon
                name="refresh"
                size={30}
                color="white"
                style={{
                  paddingTop: 64,
                  marginBottom: 20,
                  opacity: .8,
                }}
              />
            </TouchableOpacity>
          </View>
          <SubHeading>
            {events.length} events saved
          </SubHeading>
        </PadContainer>

        <PadContainer>
          <EventsList
            events={events}
            eventManager={eventManager}
          />
        </PadContainer>

      </ScrollView>
    );
  }
}

class EventsList extends Component<Props> {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
		this.props.eventManager.removeUpdatesListener(this.myEventsList);
  }

  render() {
    const { events, eventManager } = this.props;
    return (
      <View
        ref={myEventsList => {
          this.myEventsList = myEventsList;
          eventManager.registerUpdatesListener(myEventsList);
        }}
      >
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
      </View>
    )
  }
}



const styles = StyleSheet.create({
  eventCard: {
    marginBottom: 20,
  },
  headingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
