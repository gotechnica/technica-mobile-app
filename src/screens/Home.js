import React, { Component, Fragment } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import { H1, H2, H3, H4, H6, P } from '../components/Text';
import {
  ViewContainer,
  Heading,
  SubHeading,
  PaperSheet,
  PadContainer,
  HorizontalLine,
  modalStyle,
  ModalContent,
  ModalHeader,
  Spacing,
  Button
} from '../components/Base';
import Modal from 'react-native-modal';
import EventCard from '../components/EventCard';
import EventColumns from '../components/EventColumns';
import { colors } from '../components/Colors';
import MapModal from '../components/MapModal';
import CountdownTimer from '../components/CountdownTimer';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default class Home extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      updates: [],
      isUpdatesModalVisible: false,
      isMapModalVisible: false,
    };
    this.toggleMapModal = this.toggleMapModal.bind(this);
    this.toggleUpdatesModal = this.toggleUpdatesModal.bind(this);
  }

  toggleUpdatesModal() {
    this.setState({ isUpdatesModalVisible: !this.state.isUpdatesModalVisible });
  }
   // Renders the full list view of all updates
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
      style={modalStyle}
    >
      <ModalContent>
        <ModalHeader
          onBackButtonPress={() => this.toggleUpdatesModal()}
          heading="Recent Updates"
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
                      View {numUpdates - 1} other update{updates.length > 2
                        ? 's'
                        : null}
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
    const heading = 'Popular Events';
    const events = this.props.eventManager.getTopEvents(24);
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
          />
        </View>
      </View>
    );
  };

  renderBestForBeginnersSection = () => {
    const heading = 'Best for Beginners';
    const events = this.props.eventManager.getBeginnerEventsArray();
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

  toggleMapModal = () => {
    this.setState({ isMapModalVisible: !this.state.isMapModalVisible });
  }

  render() {
    return (
      <ViewContainer>
        <PadContainer>
          <View style={styles.headingRow}>
            <Heading>Technica 2018</Heading>
            <TouchableOpacity onPress={this.toggleMapModal}>
              <Icon
                name="map"
                size={30}
                color="white"
                style={{
                  paddingTop: 64,
                  marginBottom: 20,
                  opacity: .8,
                }}
              />
            </TouchableOpacity>
          </View>
          <CountdownTimer />
        </PadContainer>
        <MapModal
          isModalVisible={this.state.isMapModalVisible}
          toggleModal={this.toggleMapModal}
        />
        {this.renderUpdatesSection()}
        {this.renderPopularEventsSection()}
        {this.renderBestForBeginnersSection()}
      </ViewContainer>
    );
  }
}

const styles = StyleSheet.create({
  bottomContainer: {
    // paddingBottom: 20,
    backgroundColor: 'white'
  },
  heading: {
    marginBottom: 20
  },
  headingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subSection: {
    // paddingTop: 20,
    paddingBottom: 40
  },
  subSectionHeading: {
    paddingBottom: 20
  },
  columnContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  column: {
    flex: 5,
    flexDirection: 'column'
  },
  event: {
    // backgroundColor: 'black',
    marginBottom: 15
  }
});
