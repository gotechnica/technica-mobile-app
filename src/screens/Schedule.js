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
  GradientBackground,
  ViewContainer,
  PadContainer,
  Heading,
} from '../components/Base'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import EventGroup from '../components/schedule/EventGroup';
import EventSeparator from '../components/schedule/EventSeparator'
import ScheduleSceneTabBarOverlay from '../components/schedule/ScheduleSceneTabBarOverlay'


import moment from 'moment';
import _ from 'lodash';




import scheduleData from '../../assets/schedule.json';

const EVENT_GROUP = 'EVENT_GROUP';
const EVENT_SEPARATOR = 'EVENT_SEPARATOR';


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

  renderScheduleForDay(scheduleArray) {
    // if(this.state.loaded === false){
    //   return
    //     (<View
    //       style={styles.activityIndicatorContainer}
    //       key = {scheduleArray[0]}
    //       tabLabel={scheduleArray[0]}>
    //         <ActivityIndicator animating={true}/>
    //      </View>);
    // }

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
        return this.normalizeTimeLabel(event.startTime)
      }
    )

    labels = Object.keys(groupedData);

    groupedDataWithSeps = [];
    for (let i = 0; i < labels.length; i++) {

      groupedDataWithSeps.push(
        {
          type: EVENT_GROUP,
          header: labels[i],
          data: groupedData[labels[i]],
        }
      )

      if(i != labels.length - 1) {
        groupedDataWithSeps.push(
          {
            type: EVENT_SEPARATOR
          }
        )
      }
    }

    return (
      <FlatList
        key = {scheduleArray[0]}
        tabLabel={scheduleArray[0]}
        data={groupedDataWithSeps}
        renderItem={this.renderEventCard.bind(this)}
        keyExtractor={(item, index) => index}
      />
    );
  }

  renderEventCard(eventData) {
    if(eventData.item.type === EVENT_GROUP) {
      return (
      <EventGroup
        header = {eventData.item.header}
        data = {eventData.item.data}
      />
      )
    } else if (eventData.item.type === EVENT_SEPARATOR) {
      return (
        <EventSeparator/>
      )
    }
  }


  render() {
    return (
      <GradientBackground>
        <ViewContainer>
          <PadContainer>
            <Heading>Schedule</Heading>
              <ScrollableTabView
                renderTabBar = {() => <ScheduleSceneTabBarOverlay />}
                tabBarPosition = {'top'}
                // style = {styles.tabView}
                initialPage = {0}
                keyExtractor = {(item, index) => index}
                tabBarUnderlineStyle = {{opacity: 0}}
                >
                  {this.state.datasource.map(this.renderScheduleForDay)}
              </ScrollableTabView>
          </PadContainer>
        </ViewContainer>
      </GradientBackground>

    );
  }

  // formats the time for each event
  normalizeTimeLabel(t){
    return moment(t).format("h:mma")
  }
}



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
