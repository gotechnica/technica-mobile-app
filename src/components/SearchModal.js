import React, { Component, Fragment } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView
} from 'react-native';
import Modal from 'react-native-modal';
import { ModalContent, ModalHeader, HorizontalLine, Spacing, modalStyle } from './Base';
import { colors } from './Colors';
import { Searchbar } from 'react-native-paper';
import EventGroupComponent from '../components/schedule/EventGroupComponent';

export default class SearchModal extends Component {

  constructor(props) {
    super(props);
    this.renderScheduleForDay = this.renderScheduleForDay.bind(this);
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
      />
    );
  }

  render() {
    const props = this.props;
    const dimensions = require('Dimensions').get('window');
    const imageWidth = dimensions.width - 42;
    const imageHeight = Math.round((imageWidth * 38) / 67);
    const styles = {width: window.width, height: window.height, overflow:'visible'};
    eventDays = props.eventDays;
    return (
      <Modal
        isVisible={props.isModalVisible}
        backdropColor={colors.backgroundColor.normal}
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
          <View style={{ padding: 20, paddingBottom: 0 }}>
            <ModalHeader
              heading="Search for events"
              onBackButtonPress={() => props.toggleModal()}
            />
          </View>
          <Searchbar
            placeholder="Search"
          />
          <FlatList
            data={eventDays}
            renderItem={this.renderScheduleForDay}
          />
        </ModalContent>
      </Modal>
    );
  }
}
