import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  FlatList,
  View,
  ActivityIndicator
} from 'react-native';
import { H1, H2, H3, H4, P } from '../components/Text';
import {
  PlainViewContainer,
  ViewContainer,
  PadContainer,
  Heading
} from '../components/Base';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import EventGroupComponent from '../components/schedule/EventGroupComponent';
import ScheduleSceneTabBar from '../components/schedule/ScheduleSceneTabBar';

const styles = StyleSheet.create({
  instructions: {
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5
  },
  activityIndicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 20
  }
});

export default class Schedule extends Component<Props> {
  constructor(props) {
    super(props);

    this.renderScheduleForDay = this.renderScheduleForDay.bind(this);
  }

  componentDidMount() {}

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

  renderEventCard(eventGroupObj) {
    eventGroup = eventGroupObj.item;
    return (
      <EventGroupComponent
        header={eventGroup.label}
        events={eventGroup.events}
      />
    );
  }

  render() {
    let tabNames = this.props.eventManager
      .getEventDays()
      .map(eventDay => eventDay.label);
    return (
      <PlainViewContainer>
        <FlatList
          data={this.props.eventManager.getEventDays()}
          renderItem={this.renderScheduleForDay}
          ListHeaderComponent={() => (
            <PadContainer>
              <View>
                <Heading>Schedule</Heading>
                <ScheduleSceneTabBar
                  goToSection={i => {
                    this.scheduleListRef.scrollToIndex({
                      index: i,
                      viewOffset: 100,
                      viewPosition: 0
                    });
                  }}
                  tabs={tabNames}
                />
              </View>
            </PadContainer>
          )}
          ItemSeparatorComponent={() => <H2>Separator Component TBD</H2>}
          keyExtractor={(eventDay, index) => eventDay.label}
          ref={ref => {
            this.scheduleListRef = ref;
          }}
        />
      </PlainViewContainer>
    );
  }
}
