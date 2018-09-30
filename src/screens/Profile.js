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


const USER_DATA_STORE = 'USER_DATA_STORE';

export default class Profile extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {user:{}, scanner:false, modalVisible:true};
    }

  async logout(){
    await AsyncStorage.removeItem(USER_DATA_STORE);
    Alert.alert(
    "Logged out.",
    "Close and reopen the app to login.",
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    { cancelable: false }
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
      // loggedInUser.user_data.organizer = false;
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
                      <Button text="Logout" />
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
            return(<ViewContainer>Awaiting user data</ViewContainer>);
        }
    })();

    if(this.state.scanner)
        return(scannerView);
    else
        return(defaultView);

  }
}
