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
      savedPhone: '',
      savedSMS: '',
      fieldValue: '',
      placeholder: '123-456-7890',
      greeting: 'Welcome to \nTECHNICA 2018',
      instruction: 'Enter the phone number you used to \nsign up for Technica.',
      nextPage: (
        <TouchableHighlight onPress={() => this.sendPhoneNumber(this.state.fieldValue)}>
          <Icon
              name='arrow-right'
              size={20}
              color='white'
              style={{alignSelf: 'flex-end', paddingRight: '5%'}}
            />
        </TouchableHighlight>),


    };
  }

  componentDidMount() {

  }

  static navigationOptions = {
    header: null,
  };

  sendPhoneNumber(phoneNumber) {
    this.setState({greeting: "Great!", instruction: "We've texted you a verification code. Please input that code below to login.", 

      nextPage: (
      <TouchableHighlight onPress={() => this.sendReceivedText(this.state.fieldValue)}>
          <Icon
              name='arrow-right'
              size={20}
              color='white'
              style={{alignSelf: 'flex-end', paddingRight: '5%'}}
            />
        </TouchableHighlight>), 
      savedPhone: phoneNumber, fieldValue: '', placeholder: 'xxxxxx'});
    console.log("Phone: " + this.state.savedPhone);
  }

  sendReceivedText(sms){
    this.setState({savedSMS: sms, fieldValue: ''});
    const { navigate } = this.props.navigation;
    navigate('AppContainer');
  }

  render() {
    return (
      <ViewContainer>
        <PadContainer style={styles.subSection}>
          <Heading style={{paddingBottom: 20}}>
            {this.state.greeting}
          </Heading>
          <SubHeading>
            {this.state.instruction}
          </SubHeading>
          <TextInput
            placeholder={this.state.placeholder}
            underlineColor='white'
            selectionColor='white'
            value={this.state.fieldValue}
            onChangeText={field => this.setState({ fieldValue: field })}
            placeholderTextColor='#ffffff'
            inputColorPlaceholder='white'
            color='white'
          />
        </PadContainer>
        {this.state.nextPage}
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
