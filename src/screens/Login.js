import React, { Component, Fragment } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Alert,
  AsyncStorage,
  TextInput
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
import Icon from 'react-native-vector-icons/FontAwesome';

const APP_ID = '@com.technica.technica18:';
const EVENT_FAVORITED_STORE = APP_ID + 'EVENT_FAVORITED_STORE';
const USER_DATA_STORE = 'USER_DATA_STORE';

export default class Login extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      savedPhone: '',
      savedSMS: '',
      fieldValue: '',
      placeholder: '###-###-####',
      greeting: 'Welcome to \nTECHNICA 2018',
      instruction: 'Enter the phone number you used to \nsign up for Technica.',
      nextPage: (
        <TouchableOpacity onPress={() => this.sendPhoneNumber(this.state.fieldValue)}>
          <Icon
              name='chevron-right'
              size={22}
              color='white'
              style={styles.button}
            />
        </TouchableOpacity>),
    };
  }
//
//   async componentDidMount() {
// /*
//     await AsyncStorage.removeItem(USER_DATA_STORE);
//     this.setState({loadPage: true});*/
//
//     try {
//       const value = await AsyncStorage.getItem(USER_DATA_STORE);
//       if (value !== null) {
//         const { navigate } = this.props.navigation;
//         navigate('AppContainer');
//       }
//       this.setState({loadPage: true});
//     } catch (error) {
//        console.log(error);
//     }
//
//   }

  static navigationOptions = {
    header: null,
  };

  validPhoneNumber(phoneNumber){
    // Clean spaces, dashes, and parenthesis from phone numbers
    phoneNumber = phoneNumber.replace(/-| |\(|\)/gm,"");

    var phoneRegex = RegExp('^\\d{11,}$');
    if(phoneRegex.test(phoneNumber)){
      return "+" + phoneNumber;
    }
    phoneRegex = RegExp('^\\d{10}$');
    if(phoneRegex.test(phoneNumber)){
      return "+1" + phoneNumber;
    }
    return null;
  }

  async sendPhoneNumber(phoneNumber) {
    validNumber = this.validPhoneNumber(phoneNumber);
    if(validNumber != null){
      let url = "https://obq8mmlhg9.execute-api.us-east-1.amazonaws.com/beta/login/check-status";
      try {
          let response = await fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({'phone': validNumber})
          });
          let responseJson = await response.json();
          if(responseJson.statusCode == 200){
            this.setState({greeting: "Great!", instruction: "We've texted you a verification code. Please enter that code below to login.",
            nextPage: (
              <TouchableOpacity onPress={() => this.sendReceivedText(this.state.fieldValue)}>
                  <Icon
                      name='chevron-right'
                      size={22}
                      color='white'
                      style={styles.button}
                    />
                </TouchableOpacity>),
              savedPhone: validNumber, fieldValue: '', placeholder: 'xxxxxx'});
          } else{
            Alert.alert(
              "Your phone number was not found.",
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
        "Please enter your phone number in the format ##########.",
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
  }


  render() {
    return (
      <ViewContainer>
        <PadContainer style={styles.subSection}>
          <Heading style={{ paddingBottom: 20 }}>
            {this.state.greeting}
          </Heading>
          <SubHeading>
            {this.state.instruction}
          </SubHeading>
          <TextInput
            placeholder={this.state.placeholder}
            value={this.state.fieldValue}
            onChangeText={field => this.setState({ fieldValue: field })}
            placeholderTextColor={colors.borderGrey}
            keyboardType = 'numeric'
            style={{
              borderColor: colors.white,
              borderBottomWidth: 1,
              paddingBottom: 8,
              fontFamily: "DINPro-Medium",
              fontSize: 24,
              color: colors.white,
            }}
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
    marginTop: '30%',
  },
  columnContainer: {
    flex: 1, flexDirection: 'row'
  },
  button: {
    alignSelf: 'flex-end',
    marginTop: 20,
    paddingTop: 5,
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    marginRight: 10,
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
