import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View
} from 'react-native';
import { H1, H2, H3, H4, H6, P } from '../components/Text';
import {
  ViewContainer,
  Heading,
  SubHeading,
  PaperSheet,
  PadContainer,
  HorizontalLine,
  ModalContent,
  ModalHeader,
  Spacing,
  Button,
} from '../components/Base';
import Modal from "react-native-modal";
import EventCard from '../components/EventCard';
import EventColumns from '../components/EventColumns';
import { colors } from '../components/Colors';
import CountdownTimer from '../components/CountdownTimer';

export default class Home extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isUpdatesModalVisible: false,
      isPopularModalVisible: false,
      isBeginnerModalVisible: false,
    }
    this.toggleUpdatesModal = this.toggleUpdatesModal.bind(this);
    this.togglePopularModal = this.togglePopularModal.bind(this);
    this.toggleBegModal = this.toggleBegModal.bind(this);
  }

  toggleUpdatesModal() {
    this.setState({ isUpdatesModalVisible: !this.state.isUpdatesModalVisible })
  }
  togglePopularModal() {
    this.setState({ isPopularModalVisible: !this.state.isPopularModalVisible })
  }
  toggleBegModal() {
    this.setState({ isBeginnerModalVisible: !this.state.isBeginnerModalVisible })
  }

  renderPopularModal = () => (
    <Modal
      isVisible={this.state.isPopularModalVisible}
      backdropColor={colors.black}
      backdropOpacity={1}
      animationInTiming={250}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      animationOutTiming={300}
      backdropTransitionInTiming={250}
      backdropTransitionOutTiming={300}
      avoidKeyboard={true}
      onBackButtonPress={() => this.togglePopularModal()}
    >
      <ModalContent>
        <ModalHeader
          onBackButtonPress={() => this.togglePopularModal()}
          heading="Popular Events"
        />
      </ModalContent>
    </Modal>
  )

  renderBegModal = () => (
    <Modal
      isVisible={this.state.isBeginnerModalVisible}
      backdropColor={colors.black}
      backdropOpacity={1}
      animationInTiming={250}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      animationOutTiming={300}
      backdropTransitionInTiming={250}
      backdropTransitionOutTiming={300}
      avoidKeyboard={true}
      onBackButtonPress={() => this.toggleBegModal()}
    >
      <ModalContent>
        <ModalHeader
          onBackButtonPress={() => this.toggleBegModal()}
          heading="Best for Beginners"
        />
      </ModalContent>
    </Modal>
  )

  renderUpdatesModal = () => (
    <Modal
      isVisible={this.state.isUpdatesModalVisible}
      backdropColor={colors.black}
      backdropOpacity={1}
      animationInTiming={250}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      animationOutTiming={300}
      backdropTransitionInTiming={250}
      backdropTransitionOutTiming={300}
      avoidKeyboard={true}
      onBackButtonPress={() => this.toggleUpdatesModal()}
    >
      <ModalContent>
        <ModalHeader
          onBackButtonPress={() => this.toggleUpdatesModal()}
          heading="Recent Updates"
        />
        <Spacing/>
        <H4>11:15am</H4>
        <H6>Lunch has beeen postponed until tomorrow.</H6>
        <Spacing/>
        <HorizontalLine/>
        <Spacing/>
        <H4>11:15am</H4>
        <H6>Lunch has been postponed until tomorrow.</H6>
        <Spacing/>
        <HorizontalLine/>
        <Spacing/>
        <H4>11:15am</H4>
        <H6>Lunch has been postponed until tomorrow.</H6>
        <Spacing/>
        <HorizontalLine/>
        <Spacing/>
        <H4>11:15am</H4>
        <H6>Lunch has been postponed until tomorrow.</H6>
        <Spacing/>
        <HorizontalLine/>
        <Spacing/>
        <H4>11:15am</H4>
        <H6>Lunch has been postponed until tomorrow.</H6>
        <Spacing/>
        <HorizontalLine/>
        <Spacing/>
      </ModalContent>
    </Modal>
  )

  renderUpdatesSection = () => {
    return (
      <View>
        {this.renderUpdatesModal()}
        <PadContainer>
          <H2 style={styles.heading}>Recent Updates</H2>
        </PadContainer>
        <TouchableOpacity onPress={() => this.toggleUpdatesModal()}>
          <PaperSheet>
            <H4>11:15am</H4>
            <H6>Lunch has been postponed until tomorrow.</H6>
            <Spacing/>
            <HorizontalLine/>
            <Spacing/>
            <H6>View 5 other updates</H6>
          </PaperSheet>
        </TouchableOpacity>
      </View>
    );
  }

  renderPopularEventsSection = () => {
    return (
      <View>
        {this.renderPopularModal()}

        <PadContainer style={styles.subSection}>
          <H2>Popular Events</H2>
        </PadContainer>

        <View>
          <EventColumns />
          <TouchableOpacity onPress={() => this.togglePopularModal()}>
            <Button text="View All" />
          </TouchableOpacity>
          <Spacing />
        </View>

      </View>
    )
  }

  renderBestForBeginnersSection = () => {
    return (
      <View>

        {this.renderBegModal()}

        <PadContainer style={styles.subSection}>
          <H2>Best for Beginners</H2>
        </PadContainer>

        <EventColumns />
        <TouchableOpacity onPress={() => this.toggleBegModal()}>
          <Button text="View All" />
        </TouchableOpacity>
        <Spacing />
      </View>
    )
  }

  renderMapSection = () => (
    <View>
      <PadContainer style={styles.subSection}>
        <H2>Venue Map</H2>
      </PadContainer>
      <PadContainer>
        <EventCard big img="demo1"/>
      </PadContainer>
    </View>
  )

  render() {
    return (
      <ViewContainer>
        <PadContainer>
          <Heading>
            Technica 2018
          </Heading>
          <CountdownTimer />
        </PadContainer>
        {this.renderUpdatesSection()}
        {this.renderPopularEventsSection()}
        {this.renderBestForBeginnersSection()}
        {this.renderMapSection()}
      </ViewContainer>
    );
  }
}

const styles = StyleSheet.create({
  bottomContainer: {
    // paddingBottom: 20,
    backgroundColor: 'white',
  },
  heading: {
    marginBottom: 20,
  },
  subSection: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  columnContainer: {
    flex: 1, flexDirection: 'row'
  },
  column: {
    flex: 5,
    flexDirection: 'column',
  },
  event: {
    // backgroundColor: 'black',
    marginBottom: 15,
  },
});
