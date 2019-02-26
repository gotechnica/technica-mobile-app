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
  Heading,
  CenteredActivityIndicator,
} from '../components/Base';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import EventGroupComponent from '../components/schedule/EventGroupComponent';
import ScheduleSceneTabBar from '../components/schedule/ScheduleSceneTabBar';
import { colors } from '../components/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        eventManager={this.props.eventManager}
      />
    );
  }

  render() {
    let eventDays = this.props.eventManager.getEventDays();
    let tabNames = eventDays.map(eventDay => eventDay.label);

    if(eventDays.length == 0) {
      return (
        <CenteredActivityIndicator/>
      )
    } else {
      return (
        <PlainViewContainer>
          {/*<FlatList
            data={eventDays}
            renderItem={this.renderScheduleForDay}
            ListHeaderComponent={() => (
              <PadContainer>
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
            ItemSeparatorComponent={() => (
              <PadContainer
                style={{
                  marginTop: 20,
                  borderTopWidth: 1,
                  borderColor: colors.borderColor.light,
                  paddingTop: 30,
                }}
              >
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
          />*/}
          <ScrollableTabView
            initialPage={0}
            renderTabBar={() =>
              <ScrollableTabBar
                activeTextColor={colors.primaryColor}
                underlineStyle={{backgroundColor: colors.primaryColor}}
                textStyle={{fontSize: 20}}/>
              }
          >
            <FlatList tabLabel='Friday'
              data={eventDays}
              renderItem={this.renderScheduleForDay}/>
            <Text tabLabel='Saturday'>favorite</Text>
            <Text tabLabel='Sunday'>project</Text>
            <Text tabLabel='star'>
            </Text>
          </ScrollableTabView>
        </PlainViewContainer>
      );
    }
  }
}
