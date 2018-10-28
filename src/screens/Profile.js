import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Fragment,
} from 'react-native';
import { H1, H2, H3, H4, P } from '../components/Text';
import {
  ViewContainer,
  Heading,
  SubHeading,
  PaperSheet,
  PadContainer,
  modalStyle,
  ModalHeader,
  ModalContent,
  CenteredActivityIndicator,
  Button
} from '../components/Base';
import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCode from 'react-native-qrcode';
import _ from 'lodash';
import { colors } from '../components/Colors';
import Modal from 'react-native-modal';
import FAIcon from 'react-native-vector-icons/FontAwesome';

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
          modalContent: "",

          scannedUser: false,
          scannedUserData: {},

          // For fun...
          devoolooperMode: false,
          namePresses: 0,
          nameColor: '#FFFFFF',
          timeInterval: null,
        };
        this.onNamePress = this.onNamePress.bind(this);
    }

  async logout(){
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {text: 'OK', onPress: () => {
          AsyncStorage.removeItem(USER_DATA_STORE).then(() => {
            const navigate = this.props.navigation;
            navigate('Login');
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
            const responseUserData = responseJson.body.user_data;
            // Set state for SUCCESS modal
            this.setState({
              scannedUserData: {
                fullName: `${responseUserData.first_name} ${responseUserData.last_name}`,
                minorStatus: responseUserData.minor_status,
                dietaryRestrictions: responseUserData.dietary_restrictions,
              },
              scannedUser: true,
            })

          } else{
            // Set state for NOT FOUND modal
            this.setState({
              scannedUserData: null,
              scannedUser: true,
            })
          }
      } catch (error) {
          Alert.alert(
            "No internet connection.",
            "Try again.",
            [
              {text: 'OK', onPress: () => {this.scanner.reactivate();}},
            ],
            { cancelable: false }
          );
        }

      // this.scanner.reactivate();
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

  onNamePress() {
    this.setState({ namePresses: this.state.namePresses + 1 });

    if (this.state.namePresses > 3) {

      // If turning on devoolooperMode
      if (!this.state.devoolooperMode) {
        Alert.alert(
          "Congratulations!",
          "You have toggled devoolooper mode.",
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        );


        let count = 0;;
        let intervalID = setInterval(() => {
           // Your logic here
           this.setState({
             nameColor: (this.state.nameColor !== colors.pink) ? colors.pink : colors.cyan
           })
           if (++count === 18) {
               clearInterval(intervalID);
               this.setState({
                 nameColor: '#ffffff',
               });
           }
        }, 250);
      } else {
        Alert.alert(
          "Okay :(",
          "You can be a normal person again.",
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        );

      }

      this.setState({
        devoolooperMode: !this.state.devoolooperMode,
        namePresses: 0,
      });
    }
  }

  getDevoolooperName(name) {
    // A, E, I, O, U
    let vowels = new Set();
    vowels.add('A');
    vowels.add('E');
    vowels.add('I');
    vowels.add('O');
    vowels.add('U');

    name = name.toUpperCase();

    let newName = '';
    for (let i = 0; i < name.length; i++) {
      if (vowels.has(name.charAt(i))) {
        newName += 'oo';
      } else {
        newName += name.charAt(i);
      }
    }

    // Turn to title case
    return newName.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
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
              style={modalStyle}
            >
            <ModalContent style={{ padding: 0 }}>
              <View style={{ padding: 20, paddingBottom: 0 }}>
                <ModalHeader
                  heading="QR Scanner"
                  onBackButtonPress={() => this.toggleScanner()}
                />
              </View>
              <ViewContainer>
                <QRCodeScanner
                    ref={(node) => { this.scanner = node }}
                    onRead={this.onScanSuccess.bind(this)}
                    showMarker
                    reactivate={false}
                    customMarker={
                      <View
                        style={{
                          width: 240,
                          height: 240,
                          borderRadius: 8,
                          borderWidth: 2,
                          borderColor: colors.cyan,
                        }}
                      />
                    }
                  />
                  <ScanResponseModal
                    isVisible={this.state.scannedUser}
                    scannedUserData={this.state.scannedUserData}
                    onBack={() => {
                      this.setState({ scannedUser: false });
                      this.scanner.reactivate();
                    }}
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
                    { scannerView }
                    <PadContainer>
                      {this.state.user.user_data &&
                        <View style={{alignItems: 'center'}}>
                          <TouchableOpacity onPress={this.onNamePress}>
                            <Heading style={{ color: this.state.nameColor }}>
                              { this.state.devoolooperMode ? this.getDevoolooperName(fullName) : fullName }
                            </Heading>
                          </TouchableOpacity>
                        </View>
                      }
                      <SubHeading style={{ textAlign: 'center' }}>
                        Organizer
                      </SubHeading>
                    </PadContainer>
                    {
                      this.state.devoolooperMode &&
                      (
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
                            Use this code for TESTING.
                          </H3>
                        </View>
                      )
                    }
                    <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => this.toggleScanner()}>
                      <Button text="Open Scanner" />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => this.logout()}>
                      <Button text="Log Out" />
                    </TouchableOpacity>
                  </ViewContainer>
                );

            } else { // otherwise this person is a hacker
                return (
                  <ViewContainer>
                    <PadContainer>
                      <View style={{alignItems: 'center'}}>
                        {this.state.user.user_data && <Heading style={{ justifyContent: 'center' }}>
                            {fullName}
                        </Heading>}
                        <SubHeading style={{ textAlign: 'center' }}>
                          Your QR code
                        </SubHeading>
                      </View>
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
                        Use this code for check-in.
                      </H3>
                    </View>

                    <TouchableOpacity onPress={() => this.logout()}>
                      <Button text="Logout" />
                    </TouchableOpacity>
                  </ViewContainer>
                );

            }

        } else {
            return (
              <CenteredActivityIndicator />
            );
        }
    })();

    return (defaultView);
  }
}

// TODO make this code less redundant
const ScanResponseModal = (props) => {

  if (props.scannedUserData === null) {
    return (
      <Modal
        isVisible={props.isVisible}
        backdropColor={colors.white}
        backdropOpacity={.6}
        animationInTiming={200}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        animationOutTiming={200}
        backdropTransitionInTiming={200}
        backdropTransitionOutTiming={200}
        avoidKeyboard={true}
        onBackdropPress={props.onBack}
        onBackButtonPress={props.onBack}
        style={{ margin: 40 }}
      >
        <View style={{
          backgroundColor: colors.black,
          padding: 40,
          borderRadius: 8,
          alignItems: 'center',
        }}>
          <FAIcon
            name="times"
            size={48}
            color={colors.white}
            style={{ marginBottom: 10 }}
          />
          <H2 style={{ color: colors.white, marginBottom: 20 }}>NOT FOUND</H2>
          <H3 style={{ color: colors.fontGrey }}>Send to check-in table.</H3>
        </View>
      </Modal>
    )
  }

  return (
    <Modal
      isVisible={props.isVisible}
      backdropColor={colors.cyan}
      backdropOpacity={.6}
      animationInTiming={200}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      animationOutTiming={200}
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={200}
      avoidKeyboard={true}
      onBackdropPress={props.onBack}
      onBackButtonPress={props.onBack}
      style={{ margin: 40 }}
    >
      <View style={{
        backgroundColor: colors.black,
        padding: 40,
        borderRadius: 8,
        alignItems: 'center',
      }}>
        <FAIcon
          name="check"
          size={48}
          color={colors.cyan}
          style={{ marginBottom: 10 }}
        />
        <H2 style={{ color: colors.cyan, marginBottom: 20 }}>SUCCESS</H2>
        <H1 style={{ marginBottom: 20 }}>{props.scannedUserData.fullName}</H1>
        {
          props.scannedUserData.minorStatus &&
          <H3 style={{ color: colors.pink }}>+ Minor</H3>
        }
        {
          props.scannedUserData.dietaryRestrictions != null &&
          props.scannedUserData.dietaryRestrictions.length > 0 &&
          props.scannedUserData.dietaryRestrictions[0] !== "I Have No Food Restrictions" &&
          <H3 style={{ color: colors.pink }}>+ Dietary Restrictions</H3>
        }
      </View>
    </Modal>
  );
}
