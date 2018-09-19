import React, { Component, Fragment } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  TouchableHighlight,
  Alert,
  AsyncStorage
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

const EVENT_FAVORITED_STORE = 'EVENT_FAVORITED_STORE';
const USER_DATA_STORE = 'USER_DATA_STORE';

export default class Login extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      savedPhone: '',
      savedSMS: '',
      fieldValue: '',
      placeholder: '123-456-7890',
      greeting: 'Welcome to \nTECHNICA 2018',
      instruction: 'Enter the phone number you used to \nsign up for Technica. \n\n(Include Country Code)',
      nextPage: (
        <TouchableHighlight onPress={() => this.sendPhoneNumber("+" + this.state.fieldValue)}>
          <Icon
              name='arrow-right'
              size={20}
              color='white'
              style={{alignSelf: 'flex-end', paddingRight: '5%'}}
            />
        </TouchableHighlight>),
      loadPage: false,

    };
  }

  async componentDidMount() {
/*
    await AsyncStorage.removeItem(USER_DATA_STORE);
    this.setState({loadPage: true});*/ 

    try {
      const value = await AsyncStorage.getItem(USER_DATA_STORE);
      if (value !== null) {
        const { navigate } = this.props.navigation;
        navigate('AppContainer');
      }
      this.setState({loadPage: true}); 
    } catch (error) {
       console.log(error);
    }
      
  }

  static navigationOptions = {
    header: null,
  };

  validPhoneNumber(phoneNumber){
    var phoneRegex = RegExp('^\\+\\d{11,}$');
    return phoneRegex.test(phoneNumber);
  }

  async sendPhoneNumber(phoneNumber) {
    if(this.validPhoneNumber(phoneNumber)){
      let url = "https://obq8mmlhg9.execute-api.us-east-1.amazonaws.com/beta/login/check-status";
      try {
          let response = await fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({'phone': phoneNumber})
          });
          let responseJson = await response.json();
          if(responseJson.statusCode == 200){
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
          } else{
            Alert.alert(
              "SMS failed to send (bad credentials).",
              "Please try again.",
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: false }
            );
          }
          console.log("RESPONSE: " + JSON.stringify(responseJson));
      } catch (error) {
          Alert.alert(
            "No internet connection.",
            "Try again.",
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          );
        }
    }else{
      Alert.alert(
        "Invalid Phone Number.",
        "Please enter a phone number with the country code.",
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
        );
    }
    
  }

  async sendReceivedText(sms){

    let url = "https://obq8mmlhg9.execute-api.us-east-1.amazonaws.com/beta/login/confirm-pin";
    try {
        let phoneNumber = this.state.savedPhone;
        let response = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({'phone': phoneNumber, 'pin': sms})
        });
        let responseJson = await response.json();
        console.log("JSON:" + JSON.stringify(responseJson.body.user_data['fav_events']));
        if(responseJson.statusCode == 200){
          await AsyncStorage.setItem(USER_DATA_STORE, JSON.stringify(responseJson.body));
          await AsyncStorage.setItem(EVENT_FAVORITED_STORE, JSON.stringify(responseJson.body.user_data['fav_events']));
          this.setState({savedSMS: sms, fieldValue: ''});
          const { navigate } = this.props.navigation;
          navigate('AppContainer');
        } else{
          Alert.alert(
            "Failed to confirm pin.",
            "Please try again.",
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          );
        }
        console.log("RESPONSE: " + JSON.stringify(responseJson));
    } catch (error) {
        console.log(error);
        Alert.alert(
          "No internet connection.",
          "Try again.",
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        );
      }
  }


  render() {
    if (this.state.loadPage){
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
              keyboardType = 'numeric'
            />
          </PadContainer>
          {this.state.nextPage}
        </ViewContainer>
      );
      }else{
        return (
        <ViewContainer>
            <PadContainer style={styles.subSection}>
            <Heading style={{paddingBottom: 20, paddingLeft: '23%', paddingTop: '40%'}}>
              <Image
                style={{width: 500, height: 100}}
                source={require('../../assets/imgs/technica_logo.png')}
              />
            </Heading>
          </PadContainer>
        </ViewContainer>
      );
      }

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
