import React, { Component, Fragment } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import {
  HorizontalLine,
  ModalContent,
  ModalHeader,
  modalStyle,
  PadContainer,
  PaperSheet,
  Spacing,
  ViewContainer,
} from '../components/Base';
import { colors } from '../components/Colors';
import CountdownTimer from '../components/CountdownTimer';
import EventColumns from '../components/EventColumns';
import { H2, H4, H6 } from '../components/Text';
import HappeningNowSlideshow from '../components/HappeningNowSlideshow';

export default class Home extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      updates: [],
      isUpdatesModalVisible: false,
      isMapModalVisible: false,
      happeningNow: this.props.eventManager.getHappeningNow(),
    };
    this.toggleMapModal = this.toggleMapModal.bind(this);
    this.toggleUpdatesModal = this.toggleUpdatesModal.bind(this);
    this.timer = setInterval(() => this.setState({happeningNow: this.props.eventManager.getHappeningNow()}), 1000*60);
  }

  toggleUpdatesModal() {
    this.setState({ isUpdatesModalVisible: !this.state.isUpdatesModalVisible });
  }
  // Renders the full list view of all updates
  renderUpdatesModal = () => (
    <Modal
      isVisible={this.state.isUpdatesModalVisible}
      backdropColor={colors.backgroundColor.normal}
      backdropOpacity={1}
      animationInTiming={250}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      animationOutTiming={300}
      backdropTransitionInTiming={250}
      backdropTransitionOutTiming={300}
      avoidKeyboard={true}
      onBackButtonPress={() => this.toggleUpdatesModal()}
      style={modalStyle}
    >
      <ModalContent>
        <ModalHeader
          onBackButtonPress={() => this.toggleUpdatesModal()}
          heading="Recent Updates"
          origin={'Home'}
        />
        <Spacing />
        {this.props.eventManager.getUpdates().map(update => (
          <View key={update.id}>
            <H4>{update.time}</H4>
            <H6>{update.body}</H6>
            <Spacing />
            <HorizontalLine />
            <Spacing />
          </View>
        ))}
      </ModalContent>
    </Modal>
  );
  // Does not render anything if there are no recent updates yet
  renderUpdatesSection = () => {
    const updates = this.props.eventManager.getUpdates();
    const numUpdates = updates.length;
    return (
      // 20 less than real subsection padding to offset papersheet
      <View style={{ paddingBottom: 20 }}>
        {this.renderUpdatesModal()}
        {numUpdates > 0 ? (
          <Fragment>
            <PadContainer>
              <H2 style={styles.subSectionHeading}>Recent Updates</H2>
            </PadContainer>
            <TouchableOpacity onPress={() => this.toggleUpdatesModal()}>
              <PaperSheet>
                <H4>{updates[0].time}</H4>
                <H6>{updates[0].body}</H6>
                {numUpdates > 1 ? (
                  <Fragment>
                    <Spacing />
                    <HorizontalLine />
                    <Spacing />
                    <H6>
                      View {numUpdates - 1} other update
                      {updates.length > 2 ? "s" : null}
                    </H6>
                  </Fragment>
                ) : null}
              </PaperSheet>
            </TouchableOpacity>
          </Fragment>
        ) : null}
      </View>
    );
  };

  renderPopularEventsSection = () => {
    const heading = "Popular Events";
    const events = this.props.eventManager.getTopEvents();
    return (
      <View style={styles.subSection}>
        <PadContainer style={styles.subSectionHeading}>
          <H2>{heading}</H2>
        </PadContainer>
        <View>
          <EventColumns
            heading={heading}
            eventsArr={events}
            eventManager={this.props.eventManager}
            origin={'Home'}
          />
        </View>
      </View>
    );
  };

  renderBestForBeginnersSection = () => {
    const heading = "Featured Events";
    const events = this.props.eventManager.getFeaturedEvents();
    return (
      <View style={styles.subSection}>
        <PadContainer style={styles.subSectionHeading}>
          <H2>{heading}</H2>
        </PadContainer>
        <EventColumns
          heading={heading}
          eventsArr={events}
          eventManager={this.props.eventManager}
        />
      </View>
    );
  };

  renderHappeningNow = () => {
    const events = this.state.happeningNow.length == 0 ? this.props.eventManager.getHappeningNow() : this.state.happeningNow;
    return (
      <View style={styles.subSection}>
        <HappeningNowSlideshow
          dataSource={events}
          eventManager={this.props.eventManager}
        />
      </View>
    );
  };

  toggleMapModal = () => {
    this.setState({ isMapModalVisible: !this.state.isMapModalVisible });
  };

  render() {
    return (
      <ViewContainer>
        <PadContainer>
        <CountdownTimer />
        </PadContainer>
        {this.renderHappeningNow()}
        {this.renderPopularEventsSection()}
        {this.renderBestForBeginnersSection()}
      </ViewContainer>
    );
  }
}

const styles = StyleSheet.create({
  bottomContainer: {
    // paddingBottom: 20,
    backgroundColor: "white"
  },
  heading: {
    marginBottom: 20
  },
  headingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center'
  },
  subSection: {
    // paddingTop: 20,
    paddingBottom: 20
  },
  subSectionHeading: {
    paddingBottom: 10
  },
  columnContainer: {
    flex: 1,
    flexDirection: "row"
  },
  column: {
    flex: 5,
    flexDirection: "column"
  },
  event: {
    // backgroundColor: 'black',
    marginBottom: 15
  }
});
