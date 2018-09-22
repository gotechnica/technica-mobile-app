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
  ModalContent,
  ModalHeader,
  Spacing,
  Button
} from '../components/Base';
import Modal from 'react-native-modal';
import EventCard from '../components/EventCard';
import EventColumns from '../components/EventColumns';
import { colors } from '../components/Colors';
import CountdownTimer from '../components/CountdownTimer';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default class Home extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      updates: [],
      isUpdatesModalVisible: false
    };
    this.toggleUpdatesModal = this.toggleUpdatesModal.bind(this);
    this.onMapButtonPress = this.onMapButtonPress.bind(this);
  }

  componentDidMount() {
    // TODO Wait for updates from API
    // Push each update to front of the array
    this.setState({
      updates: [
        {
          id: 3,
          time: '2:15pm, Saturday',
          body: 'Lunch has beeen postponed until tomorrow.'
        },
        {
          id: 2,
          time: '12:00pm, Saturday',
          body: 'Snacks have been remove from the facility'
        },
        {
          id: 1,
          time: '11:00am, Saturday',
          body: 'Get your new chickens from the stand'
        }
      ]
    });
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
    >
      <ModalContent>
        <ModalHeader
          onBackButtonPress={() => this.toggleUpdatesModal()}
          heading="Recent Updates"
        />
        <Spacing />
        {this.state.updates.map(update => (
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
    const { updates } = this.state;
    const numUpdates = updates.length;
    return (
      <View>
        {this.renderUpdatesModal()}
        {numUpdates > 0 ? (
          <Fragment>
            <PadContainer>
              <H2 style={styles.heading}>Recent Updates</H2>
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
    const events = this.props.eventManager.getTopEvents(10);
    return (
      <View>
        <PadContainer style={styles.subSection}>
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
      <View>
        <PadContainer style={styles.subSection}>
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

  onMapButtonPress = () => {
    Alert.alert(
      "TODO make a map",
      "Please try again.",
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    );
  }

  render() {
    return (
      <ViewContainer>
        <PadContainer>
          <View style={styles.headingRow}>
            <Heading>Technica 2018</Heading>
            <TouchableOpacity onPress={this.onMapButtonPress}>
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
    paddingTop: 20,
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
