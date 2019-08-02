import React, { Component, Fragment } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { H1, H2, H3, H4, P } from "../components/Text";
import {
  ViewContainer,
  Heading,
  SubHeading,
  Button,
  PaperSheet,
  PadContainer
} from "../components/Base";
import EventCard from "../components/EventCard";
import EventDescription from "../components/schedule/EventDescription";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { colors } from "../components/Colors";

/**
 * Saved page contains lists of users past and upcoming saved events.
 */
export default class Saved extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      showPastEvents: false
    };
  }

  render() {
    const { eventManager } = this.props;
    const events = eventManager.getSavedEventsArray();

    const pastEvents = events.filter(event => event.hasPassed);
    const upcomingEvents = events.filter(event => !event.hasPassed);

    return (
      <ScrollView>
        <PadContainer>
          <View style={styles.headingRow}>
            <Heading>Saved</Heading>
            {/* Refresh button which reloads users saved events data */}
            <TouchableOpacity
              onPress={() => {
                this.setState({ refresh: !this.state.refresh });
              }}
            >
              <Icon
                name="refresh"
                size={30}
                color="white"
                style={{
                  paddingTop: 64,
                  marginBottom: 20,
                  opacity: 0.8
                }}
              />
            </TouchableOpacity>
          </View>
          {/* Details how many events were saved by the user. */}
          <SubHeading>{events.length} events saved</SubHeading>
          {/* Logic and components that allow the user to hide or display past events. */
          pastEvents.length > 0 && (
            <Fragment>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ showPastEvents: !this.state.showPastEvents });
                }}
              >
                <Button
                  text={`${this.state.showPastEvents ? "Hide" : "Show"} ${
                    pastEvents.length
                  } past event${pastEvents.length > 1 ? "s" : ""}`}
                  style={styles.showPastEventsButton}
                />
              </TouchableOpacity>
            </Fragment>
          )}
          {/* The list of past events, only shown if user selected this option */
          pastEvents.length > 0 && this.state.showPastEvents && (
            <Fragment>
              <EventsList events={pastEvents} eventManager={eventManager} />
            </Fragment>
          )}
          {/* List of upcoming events saved by the user. */
          upcomingEvents.length > 0 && (
            <Fragment>
              <EventsList events={upcomingEvents} eventManager={eventManager} />
            </Fragment>
          )}
        </PadContainer>
      </ScrollView>
    );
  }
}

/**
 * List of events that the user has saved.
 */
class EventsList extends Component<Props> {
  constructor(props) {
    super(props);
  }

  /**
   * ComponentWillUnmount() will be called before component is destroyed,
   * this ensures listeners are removed and prevents memory leakes
   */
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
        {/* Each event is in the list of events is styled into an EventCard */
        events.map(event => (
          <EventCard
            key={event.eventID}
            event={event}
            eventManager={eventManager}
            big
            style={styles.eventCard}
            imageStyle={event.hasPassed ? styles.eventImgPassed : null}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  eventCard: {
    marginBottom: 20
  },
  eventImgPassed: {
    opacity: 0.3
  },
  subSectionHeading: {
    paddingBottom: 20
  },
  showPastEventsButton: { marginLeft: 0, marginRight: 0, marginBottom: 20 },
  headingRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
