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
import moment from 'moment';
import PhotoView from 'react-native-photo-view';
import { Searchbar } from 'react-native-paper';
import {
  PlainViewContainer,
  ViewContainer,
  PadContainer,
  Heading,
  CenteredActivityIndicator,
} from '../components/Base';
import ScheduleSceneTabBar from '../components/schedule/ScheduleSceneTabBar';


export default class SearchModal extends Component {
  render() {
    const props = this.props;
    const dimensions = require('Dimensions').get('window');
    const imageWidth = dimensions.width - 42;
    const imageHeight = Math.round((imageWidth * 38) / 67);
    const styles = {width: window.width, height: window.height, overflow:'visible'};
    console.log(props);
    eventDays = props.eventDays;
    console.log("DAYs: " + eventDays);
    //let tabNames = eventDays.map(eventDay => eventDay.label);
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
          />
        </ModalContent>
      </Modal>
    );
  }
}
