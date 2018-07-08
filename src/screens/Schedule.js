import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  FlatList,
  View,
  ActivityIndicator,
} from 'react-native';
import { H1, H2, H3, H4, P } from '../components/Text';
import {
  PlainViewContainer,
  ViewContainer,
  PadContainer,
  Heading,
} from '../components/Base'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import EventGroup from '../components/schedule/EventGroup';
import ScheduleSceneTabBar from '../components/schedule/ScheduleSceneTabBar'

import _ from 'lodash';
import moment from 'moment';
import { normalizeTimeLabel } from '../actions/util.js';
import scheduleData from '../../assets/schedule.json';

const styles = StyleSheet.create({
  instructions: {
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5,
  },
  activityIndicatorContainer:{
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      paddingBottom: 20,
  },
});

export default class Schedule extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = {
      datasource: scheduleData.Schedule
    }

    this.renderScheduleForDay = this.renderScheduleForDay.bind(this);

  }

  componentDidMount() {

  }

  renderScheduleForDay(dayObj) {
    // if(this.state.loaded === false){
    //   return
    //     (<View
    //       style={styles.activityIndicatorContainer}
    //       key = {scheduleArray[0]}
    //       tabLabel={scheduleArray[0]}>
    //         <ActivityIndicator animating={true}/>
    //      </View>);
    // }
    scheduleArray = dayObj.item
    alteredData = scheduleArray[1].sort((event1, event2) => {
      start1 = moment(event1.startTime);
      start2 = moment(event2.startTime);

      end1 = moment(event1.endTime);
      end2 = moment(event2.endTime);

      if(start1 - start2 == 0){
        return end1 - end2;
      }

      return start1 - start2;
    })

    groupedData = _.groupBy(
      alteredData,
      (event) => {
        return normalizeTimeLabel(event.startTime)
      }
    )

    labels = Object.keys(groupedData);

    eventGroupObjs = [];
    for (let i = 0; i < labels.length; i++) {

      eventGroupObjs.push(
        {
          header: labels[i],
          data: groupedData[labels[i]],
        }
      )
    }

    return (<FlatList
        key = {scheduleArray[0]}
        data={eventGroupObjs}
        renderItem = {this.renderEventCard.bind(this)}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled = {false}
      />);
  }

  renderEventCard(eventData) {
    //console.log(eventData);
    return (
      <EventGroup
        header = {eventData.item.header}
        data = {eventData.item.data}
      />);
  }

  render() {
    let tabNames = this.state.datasource.map((day) => day[0]);
    return (
      <PlainViewContainer>
        <FlatList
          data = {this.state.datasource}
          renderItem = {this.renderScheduleForDay}
          ListHeaderComponent = {() => (
            <PadContainer>
              <View>
                <Heading>Schedule</Heading>
                <ScheduleSceneTabBar
                  goToSection = {(i) => {
                    this.scheduleListRef.scrollToIndex({
                      index: i,
                      viewOffset: 100,
                      viewPosition: 0
                    })}}
                  tabs = {tabNames}
                />
              </View>
            </PadContainer>)}
          ItemSeparatorComponent = {() => (<H2>Separator Component TBD</H2>)}
          keyExtractor = {(item, index) => item[0]}
          ref = {(ref) => {this.scheduleListRef = ref}}>
        </FlatList>
      </PlainViewContainer>
    );
  }
}
