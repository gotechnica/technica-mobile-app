import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  FlatList,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

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
import CustomScheduleTabBar from '../components/schedule/CustomScheduleTabBar';
import { colors } from '../components/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Saved from "./Saved";

export default class Schedule extends Component<Props> {
  constructor(props) {
    super(props);

    this.renderScheduleForDay = this.renderScheduleForDay.bind(this);
  }

  componentDidMount() {}

  renderScheduleForDay(eventDayObj) {
    eventDay = eventDayObj.item;
    //console.log(eventDayObj);
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
    console.log(eventDays);
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
            renderTabBar={() => <CustomScheduleTabBar/> }
          >
            {eventDays.map((eventDay,index) =>
              <ScrollView key={index} tabLabel={eventDay.label} style={styles.tabView}>
                <FlatList
                  data={[eventDay]}
                  renderItem={this.renderScheduleForDay}
                  keyExtractor={(event, index) => index.toString()}
                />
              </ScrollView>
            )}
            <ScrollView tabLabel="star" style={styles.tabView}>
            <Saved
              ref={mySaved => {
                this.mySaved = mySaved;
                this.props.eventManager.registerEventChangeListener(mySaved);
              }}
              eventManager={this.props.eventManager}
            />
            </ScrollView>
          </ScrollableTabView>
        </PlainViewContainer>
      );
    }
  }
}

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)'
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3
  }
})
