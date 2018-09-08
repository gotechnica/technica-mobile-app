import React, { Component, Fragment } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  TouchableHighlight
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
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default class Login extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
    };

    this.sendPhoneNumber = this.sendPhoneNumber.bind(this)
  }

  componentDidMount() {
  }

  sendPhoneNumber(phoneNumber) {
    console.log("HERE");
    console.log("Phone Number: " + phoneNumber);
  }


  render() {
    return (
      <ViewContainer>
        <PadContainer style={styles.subSection}>
          <Heading style={{paddingBottom: 20}}>
            Welcome to {"\n"}TECHNICA 2018
          </Heading>
          <SubHeading>
            Enter the phone number you used to {"\n"}sign up for Technica.
          </SubHeading>
          <TextInput
            placeholder='123-456-789'
            underlineColor='white'
            selectionColor='white'
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
            placeholderTextColor='#ffffff'
            inputColorPlaceholder='white'
            color='white'
          />
        </PadContainer>
        <TouchableHighlight onPress={this.sendPhoneNumber.bind(this.state.phone)}>
          <Icon
              name='arrow-right'
              size={20}
              color='white'
              style={{alignSelf: 'flex-end', paddingRight: '5%'}}
            />
        </TouchableHighlight>
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
    paddingTop: '30%',
    paddingBottom: '30%',
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
