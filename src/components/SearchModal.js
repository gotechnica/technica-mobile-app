import React, { Component, Fragment } from 'react';
import { FlatList, View, Platform, ScrollView, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Modal from 'react-native-modal';
import { SearchBar } from 'react-native-elements';
import { H3 } from "./Text";
import EventGroupComponent from '../components/schedule/EventGroupComponent';
import EventDay from '../events/EventDay';
import EventGroup from '../events/EventGroup';
import { ModalContent, ModalHeader, modalStyle } from './Base';
import { colors } from './Colors';
import PillBadge from './PillBadge';
import {badgeStyles} from './PillBadge.js';
import CustomScheduleTabBar from './schedule/CustomScheduleTabBar';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';

export default class SearchModal extends Component {

  constructor(props) {
    super(props);
    this.renderScheduleForDay = this.renderScheduleForDay.bind(this);
    this.filterEvents = this.filterEvents.bind(this);
    this.state = {
      schedule: this.props.eventDays,
      search: '',
      newSchedule: [],
      offsetHeight: 0
    }

  }

  filterEvents(query) {
    query = query.toLowerCase();
    eventDays = this.state.schedule;
    newSchedule = []

    // We apologize for this mess :(
    if(query !== "") {
      for (ed in eventDays) {
        day = eventDays[ed];
        newEventDay = new EventDay(day.label, [])
        for (eventGroupIndex in day.eventGroups) {
          eventGroup = day.eventGroups[eventGroupIndex];
          newEventGroup = new EventGroup(eventGroup.label, [])
          for (eventIndex in eventGroup.events) {
            event = eventGroup.events[eventIndex];
            if (event.title.toLowerCase().search(query) >= 0 ||
                event.category.toLowerCase().search(query) >= 0) {
              newEventGroup.events.push(event);
            }
          }
          if (newEventGroup.events.length > 0) {
            newEventDay.eventGroups.push(newEventGroup);
          }
        }
        newSchedule.push(newEventDay);
      }
    }

    this.setState({
      newSchedule: newSchedule,
      search: query
    });
  }

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
        origin={'Search'}
      />
    );
  }

  measureView(event) {
    this.setState({
      offsetHeight: (this.state.offsetHeight + event.nativeEvent.layout.height)
    });
    console.log(this.state.offsetHeight);
  }

  render() {
    const props = this.props;
    const dimensions = require('Dimensions').get('window');
    const imageWidth = dimensions.width - 42;
    const imageHeight = Math.round((imageWidth * 38) / 67);
    const styles = {width: window.width, height: window.height, overflow:'visible'};
    let badges = [];
    for (let obj in badgeStyles) {
      badges.push(
        <TouchableOpacity
          onPress={() => this.filterEvents(obj)}
          key={obj}>
          <PillBadge
            category={obj}
            from='Modal'
            margin={5}
          />
        </TouchableOpacity>);
    }
    let newSchedule = this.state.newSchedule.filter(event => event.eventGroups.length > 0);
    return (
      <Modal
        isVisible={props.isModalVisible}
        backdropColor={'#f7f7f7'}
        backdropOpacity={1}
        animationInTiming={250}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        animationOutTiming={300}
        backdropTransitionInTiming={250}
        backdropTransitionOutTiming={300}
        avoidKeyboard={true}
        onBackButtonPress={() => props.toggleModal()}
        style={[modalStyle]}
      >
      <ModalContent style={{padding:0}}>
          {Platform.OS === 'ios' ?
            <View style={{ padding: 20, paddingBottom: 0, paddingTop: 0 }}>
              <ModalHeader
                heading=''
                onBackButtonPress={() => props.toggleModal()}
                origin={'Schedule'}
                isSearch={true}
              />
            </View>
            :
            <Fragment></Fragment>}
          <SearchBar
            onLayout={(event) => this.measureView(event)}
            placeholder="Search"
            platform={Platform.OS}
            onChangeText={query => this.filterEvents(query)}
            onClear={query => this.filterEvents('')}
            value={this.state.search}
            cancelButtonProps={{color: colors.primaryColor}}
          />
          <View style={{flex: 1, borderTopWidth: 0.5}}>
            <View style={{flex: 1, padding: 9, paddingTop: 10, paddingBottom: 10}}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {badges}
              </ScrollView>
            </View>
          </View>
          {this.state.newSchedule.length > 0 ?
            <ScrollableTabView
              initialPage={0}
              renderTabBar={() => <CustomScheduleTabBar /> }
              style={{height: (dimensions.height - 134)}}
            >
              {newSchedule.map((eventDay,index) =>
                ( eventDay.eventGroups.length > 0 ?
                <ScrollView key={index} tabLabel={eventDay.label} style={[styles.tabView]}>
                  <FlatList
                    data={[eventDay]}
                    renderItem={this.renderScheduleForDay}
                    keyExtractor={(event, index) => index.toString()}
                  />
                </ScrollView>
                :
                <Fragment></Fragment>)
              )}
            </ScrollableTabView>
            :
            <Fragment></Fragment>
          }
          </ModalContent>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingLeft: 15,
    paddingBottom: 3,
    paddingTop: 3,
    color: 'white',
    backgroundColor: colors.primaryColor,
    fontWeight: '500',
    fontSize: 25,
    //borderBottomWidth: 5,
    //borderTopWidth: 0.5,
    //borderBottomColor: colors.primaryColor,
    //borderTopColor: 'black',
    //textAlign: 'center'
  },
  tabView: {
    flex: 1,
    //padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)'
  },
});
