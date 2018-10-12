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
      // TODO: verify that this hacker is registered
      //const isRegistered = await verifyHacker(e.data);
      //this.setState({modalVisible: true});
      // TODO: should be a modal instead
      // TODO: only do this on modal exit
      alert(e.data);
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
                            value={fullName}
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
            return (
              <CenteredActivityIndicator />
            );
        }
    })();

    return (defaultView);
  }
}
