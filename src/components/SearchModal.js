import React, { Component, Fragment } from 'react';
import { FlatList, View, Platform, ScrollView, TouchableOpacity } from 'react-native';
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

export default class SearchModal extends Component {

  constructor(props) {
    super(props);
    this.renderScheduleForDay = this.renderScheduleForDay.bind(this);
    this.filterEvents = this.filterEvents.bind(this);
    this.state = {
      schedule: this.props.eventDays,
      search: '',
      newSchedule: {}
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
        style={modalStyle}
      >
        <ModalContent style={{ padding: 0 }}>
          {Platform.OS === 'ios' ? <View style={{ padding: 20, paddingBottom: 0, paddingTop: 0 }}>
            <ModalHeader
              heading=''
              onBackButtonPress={() => props.toggleModal()}
              origin={'Schedule'}
              isSearch={true}
            />
          </View>: <Fragment></Fragment>}
          <SearchBar
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
          <FlatList
            data={this.state.newSchedule}
            renderItem={this.renderScheduleForDay}
            style={{padingTop: 10}}
            keyExtractor={(event, index) => index.toString()}
            />
        </ModalContent>
      </Modal>
    );
  }
}
