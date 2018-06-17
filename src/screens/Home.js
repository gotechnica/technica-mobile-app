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
  GradientBackground,
  HorizontalLine,
  ModalContent,
  ModalHeader,
  Spacing,
  Button,
} from '../components/Base';
import Images from '../../assets/imgs/index';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';

// TODO make this carry a whole event object, and contain the modal to render! make this its own file too
const EventCard = ({ name, saves, img, big }) => {
  const dimensions = require('Dimensions').get('window');

  const imageWidth = (big) ? dimensions.width - 40 : (dimensions.width / 2) - 30;
  const imageHeight = Math.round(imageWidth * 38/67);

  console.log(Image);

  return (
    <TouchableOpacity>
      <View style={styles.event}>
        <Image
          style={{
            width: imageWidth,
            height: imageHeight,
            borderRadius: 4,
            marginBottom: 5,
          }}
          // source={Image[img]}
          source={Images[img]}
        />
        {
          (big) ?
            null
            :
            (
              <View>
                <H3>{name}</H3>
                <H6><Icon name="heart" size={12} color="#000000"/> {saves}</H6>
              </View>
            )
        }
        {/* heart-o for outline heart */}
      </View>
    </TouchableOpacity>
  );
}

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
      backdropColor={'white'}
      backdropOpacity={1}
      animationInTiming={250}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationOutTiming={250}
      backdropTransitionInTiming={250}
      backdropTransitionOutTiming={250}
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
      backdropColor={'white'}
      backdropOpacity={1}
      animationInTiming={250}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationOutTiming={250}
      backdropTransitionInTiming={250}
      backdropTransitionOutTiming={250}
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
      backdropColor={'white'}
      backdropOpacity={1}
      animationInTiming={250}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationOutTiming={250}
      backdropTransitionInTiming={250}
      backdropTransitionOutTiming={250}
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
    const { width, height } = require('Dimensions').get('window');
    return (
      <View>
        {this.renderPopularModal()}

        <PadContainer white style={styles.subSection}>
          <H2>Popular Events</H2>
        </PadContainer>

        <View style={{ backgroundColor: 'white' }}>
          <PadContainer white style={[styles.columnContainer, { width: width }]}>
            <View style={styles.column}>
              <EventCard name="Demo Event" saves="255" img="demo1"/>
              <EventCard name="Demo Event" saves="255" img="demo1"/>
              <EventCard name="Demo Event" saves="255" img="demo3"/>
            </View>
            <View style={{width: 20}}></View>
            <View style={styles.column}>
              <EventCard name="Demo Event" saves="255" img="demo2"/>
              <EventCard name="Demo Event" saves="255" img="demo3"/>
              <EventCard name="Demo Event" saves="255" img="demo1"/>
            </View>
          </PadContainer>
          <TouchableOpacity onPress={() => this.togglePopularModal()}>
            <Button text="View All" />
          </TouchableOpacity>
          <Spacing />
        </View>

      </View>
    )
  }

  renderBestForBeginnersSection = () => {
    const { width, height } = require('Dimensions').get('window');
    return (
      <View style={{ backgroundColor: 'white' }}>

        {this.renderBegModal()}

        <PadContainer white style={styles.subSection}>
          <H2>Best for Beginners</H2>
        </PadContainer>

        <PadContainer white style={[styles.columnContainer, { width: width }]}>
          <View style={styles.column}>
            <EventCard name="Demo Event" saves="255" img="demo1"/>
            <EventCard name="Demo Event" saves="255" img="demo1"/>
            <EventCard name="Demo Event" saves="255" img="demo3"/>

          </View>

          <View style={{width: 20}}></View>

          <View style={styles.column}>
            <EventCard name="Demo Event" saves="255" img="demo2"/>
            <EventCard name="Demo Event" saves="255" img="demo3"/>
            <EventCard name="Demo Event" saves="255" img="demo1"/>
          </View>
        </PadContainer>
        <TouchableOpacity onPress={() => this.toggleBegModal()}>
          <Button text="View All" />
        </TouchableOpacity>
        <Spacing />
      </View>
    )
  }

  renderMapSection = () => (
    <View style={{ backgroundColor: 'white' }}>
      <PadContainer white style={styles.subSection}>
        <H2>Venue Map</H2>
      </PadContainer>
      <PadContainer>
        <EventCard big img="demo1"/>
      </PadContainer>
    </View>
  )

  render() {
    return (
      <GradientBackground>
        <ViewContainer>
          <PadContainer>
            <Heading>
              Technica 2018
            </Heading>
            <SubHeading>
              16h 34m 53s left to hack
            </SubHeading>
          </PadContainer>
          {this.renderUpdatesSection()}
          {this.renderPopularEventsSection()}
          {this.renderBestForBeginnersSection()}
          {this.renderMapSection()}
        </ViewContainer>
      </GradientBackground>
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
