import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  FlatList,
  View,
  ActivityIndicator
} from "react-native";
import { H1, H2, H3, H4, P } from "../components/Text";
import {
  PlainViewContainer,
  ViewContainer,
  PadContainer,
  Heading,
  CenteredActivityIndicator
} from "../components/Base";
import ScrollableTabView from "react-native-scrollable-tab-view";
import EventGroupComponent from "../components/schedule/EventGroupComponent";
import ScheduleSceneTabBar from "../components/schedule/ScheduleSceneTabBar";
import { colors } from "../components/Colors";

/**
 * Schedule page lists the schedule of events for all days of the hackathon.
 */
export default class Schedule extends Component<Props> {
  constructor(props) {
    super(props);

    this.renderScheduleForDay = this.renderScheduleForDay.bind(this);
  }

  componentDidMount() {}
  /**
   * description: Function returns a list containing all hackathon events within a day.
   * @param {Object} eventDayObj object that contains the event day to be displayed.
   */
  renderScheduleForDay(eventDayObj) {
    eventDay = eventDayObj.item;
    return (
      <FlatList
        key={eventDay.label}
        data={eventDay.eventGroups}
        renderItem={this.renderEventCard.bind(this)}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
      />
    );
  }
  /**
   * description: Returns a component representing a specific hackathon event.
   * @param {Object} eventGroupObj object that contains information regarding the event.
   */
  renderEventCard(eventGroupObj) {
    eventGroup = eventGroupObj.item;
    return (
      <EventGroupComponent
        header={eventGroup.label}
        events={eventGroup.events}
        eventManager={this.props.eventManager}
      />
    );
  }

  render() {
    let eventDays = this.props.eventManager.getEventDays();
    let tabNames = eventDays.map(eventDay => eventDay.label);

    if (eventDays.length == 0) {
      /* UI Spinner which indicates that the app is loading data */
      return <CenteredActivityIndicator />;
    } else {
      return (
        <PlainViewContainer>
          {/* A list that contains all events for the day */}
          <FlatList
            data={eventDays}
            renderItem={this.renderScheduleForDay}
            ListHeaderComponent={() => (
              <PadContainer>
                <Heading>Schedule</Heading>
                {/* TabBar which displays the days of the hackathon, 1st day is highlighted */}
                <ScheduleSceneTabBar
                  goToSection={i => {
                    this.scheduleListRef.scrollToIndex({
                      index: i,
                      viewOffset: 100,
                      viewPosition: 0
                    });
                  }}
                  tabs={tabNames}
                  activeTab={0}
                />
              </PadContainer>
            )}
            /* Divider which splits the event lists of the different days of the hackathon */

            ItemSeparatorComponent={() => (
              <PadContainer
                style={{
                  marginTop: 20,
                  borderTopWidth: 1,
                  borderColor: colors.borderGrey,
                  paddingTop: 30
                }}
              >
                {/* TabBar which displays the days of the hackathon, 2nd day is highlighted */}
                <ScheduleSceneTabBar
                  goToSection={i => {
                    this.scheduleListRef.scrollToIndex({
                      index: i,
                      viewOffset: 100,
                      viewPosition: 0
                    });
                  }}
                  tabs={tabNames}
                  activeTab={1}
                />
              </PadContainer>
            )}
            keyExtractor={(eventDay, index) => eventDay.label}
            ref={ref => {
              this.scheduleListRef = ref;
            }}
          />
        </PlainViewContainer>
      );
    }
  }
}
