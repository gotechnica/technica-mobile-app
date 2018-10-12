import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { H1, H2, H3, H4, P } from '../components/Text';
import {
  ViewContainer,
  Heading,
  SubHeading,
  PaperSheet,
  PadContainer,
  ModalHeader,
  ModalContent,
  Button
} from '../components/Base';
import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCode from 'react-native-qrcode';
import _ from 'lodash';
import { colors } from '../components/Colors';
import Modal from 'react-native-modal';
import RNRestart from 'react-native-restart';

const FORCE_NORMAL_USER = false; // NOTE dangerous debug mode setting

const USER_DATA_STORE = 'USER_DATA_STORE';

export default class Profile extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {
          user:{},
          scanner:false,
          modalVisible:true,
          userModal: false,
          modalContent: ""
        };
    }

  async logout(){
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {text: 'OK', onPress: () => {
          AsyncStorage.removeItem(USER_DATA_STORE).then(() => {
            RNRestart.Restart();
          });
        }},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: true }
    );
  }

  toggleScanner(){
      this.setState({scanner: !this.state.scanner});
  }

  async onScanSuccess(e) {
      let url = "https://obq8mmlhg9.execute-api.us-east-1.amazonaws.com/beta/login/login-user";
      try {
          let phoneNumber = e.data;
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

            const scannedUserData = responseJson.body.user_data;
            const fullname = `${scannedUserData.first_name} ${scannedUserData.last_name}`;
            const minorStatus = scannedUserData.minor_status;
            const dietaryRestrictions = scannedUserData.dietary_restrictions;

            console.log(scannedUserData);
            console.log(fullname);
            console.log(minorStatus);
            console.log(dietaryRestrictions);

            Alert.alert(
              "hello",
              "hi",
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: false }
            );
          } else{
            Alert.alert(
              "Failed to login user",
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

      this.scanner.reactivate();
  }

  async verifyHacker(){
      return true;

  }

  async componentDidMount(){
      var loggedInUser = JSON.parse(await AsyncStorage.getItem(USER_DATA_STORE));
      if (FORCE_NORMAL_USER) {
        loggedInUser.user_data.organizer = false;
      }
      this.setState({user: loggedInUser});
  }

  toggleModal(){
      this.setState({modalVisible:!this.state.modalVisible});
  }

  render() {

    const scannerView = (() => {
        return(
            <Modal
              isVisible={this.state.scanner}
              backdropColor={colors.black}
              backdropOpacity={1}
              animationInTiming={250}
              animationIn="fadeInUp"
              animationOut="fadeOutDown"
              animationOutTiming={300}
              backdropTransitionInTiming={250}
              backdropTransitionOutTiming={300}
              avoidKeyboard={true}
              onBackButtonPress={() => this.toggleScanner()}
              style={{ margin: 0 }}
            >
            <ModalContent>
              <View style={{ padding: 15, paddingBottom: 0 }}>
                <ModalHeader
                  heading="QR Scanner"
                  onBackButtonPress={() => this.toggleScanner()}
                />
              </View>
              <ViewContainer>
                <QRCodeScanner
                    ref={(node) => { this.scanner = node }}
                    onRead={this.onScanSuccess.bind(this)}
                  />
              </ViewContainer>
            </ModalContent>
          </Modal>
        )
    })();

    const defaultView = ( () => {
        if(this.state.user.user_data){
            const fullName = this.state.user.user_data ?
                this.state.user.user_data.first_name + " " + this.state.user.user_data.last_name :
                "";
            const phone_number = this.state.user.user_data ? this.state.user.user_data.phone : "";

            if(this.state.user.user_data.organizer){
                return (
                  <ViewContainer>
                    <PadContainer>
                      {this.state.user.user_data && <Heading style={{ justifyContent: 'center' }}>
                          { fullName }
                      </Heading>}
                      <SubHeading style={{ textAlign: 'center' }}>
                        Organizer
                      </SubHeading>
                    </PadContainer>
                    <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => this.toggleScanner()}>
                      <Button text="Open Scanner" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.logout()}>
                      <Button text="Log Out" />
                    </TouchableOpacity>
                  </ViewContainer>
                );

            } else { // otherwise this person is a hacker
                return (
                  <ViewContainer>
                    <PadContainer>
                      {this.state.user.user_data && <Heading style={{ justifyContent: 'center' }}>
                          {fullName}
                      </Heading>}
                      <SubHeading style={{ textAlign: 'center' }}>
                        Your QR code
                      </SubHeading>
                    </PadContainer>
                    <View style={{
                      alignItems: 'center',
                    }}>
                      <View style={{
                        backgroundColor: 'white',
                        padding: 20,
                        borderRadius: 8,
                        marginBottom: 20,
                      }}>
                        {
                          this.state.user.user_data &&
                          <QRCode
                            value={phone_number}
                            size={180}
                            bgColor='black'
                            fgColor='white'
                          />
                        }
                      </View>
                      <H3 style={{ marginBottom: 40 }}>
                        Use this code for check-in
                      </H3>
                    </View>

                    <TouchableOpacity onPress={() => this.logout()}>
                      <Button text="Logout" />
                    </TouchableOpacity>
                  </ViewContainer>
                );

            }

        } else {
            return(<ViewContainer><H1>Awaiting user data</H1></ViewContainer>);
        }
    })();

    if(this.state.scanner)
        return(scannerView);
    else
        return(defaultView);

  }
}
