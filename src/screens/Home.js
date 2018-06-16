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
  Spacing,
} from '../components/Base';
import Images from '../../assets/imgs/index';
import Modal from "react-native-modal";

const EventCard = ({ name, saves, img }) => {
  const dimensions = require('Dimensions').get('window');
  const imageWidth = (dimensions.width / 2) - 30;
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
        <H3>{name}</H3>
        <H6>{`[X] ${saves}`}</H6>
      </View>
    </TouchableOpacity>
  );
}

export default class Home extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    }
  }

  toggleModal = (question, answer) => {
    isModalVisible: !this.state.isModalVisible
  }

  closeModal = () =>
    this.setState({ isModalVisible: false });

  render() {
    const { width, height } = require('Dimensions').get('window');
    return (
      <GradientBackground>
        <Modal
          isVisible={this.state.isModalVisible}
          backdropColor={'white'}
          backdropOpacity={1}
          animationInTiming={250}
          animationIn="fadeIn"
          animationOut="fadeOut"
          animationOutTiming={250}
          backdropTransitionInTiming={250}
          backdropTransitionOutTiming={250}
          avoidKeyboard={true}
          onBackButtonPress={() => this.setState({ isModalVisible: false })}
        >
          <ModalContent>
            <TouchableOpacity onPress={() => this.setState({ isModalVisible: false })}>
              <H1>{'<='}</H1>
            </TouchableOpacity>
            <H1>hello</H1>
          </ModalContent>
        </Modal>
        <ViewContainer>
          <PadContainer>
            <Heading>
              Technica 2018
            </Heading>
            <SubHeading>
              16h 34m 53s left to hack
            </SubHeading>
          </PadContainer>

          <PadContainer>
            <H2 style={styles.heading}>Recent Updates</H2>
          </PadContainer>
          <TouchableOpacity onPress={() => { this.setState({ isModalVisible: !this.state.isModalVisible })}}>
            <PaperSheet>
              <H4>11:15am</H4>
              <H6>Lunch has been postponed until tomorrow.</H6>
              <Spacing/>
              <HorizontalLine/>
              <Spacing/>
              <H6>View 5 other updates</H6>
            </PaperSheet>
          </TouchableOpacity>

          <PadContainer white style={styles.subSection}>
            <H2>Popular Events</H2>
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

        </ViewContainer>
      </GradientBackground>
    );
  }
}

const styles = StyleSheet.create({
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
