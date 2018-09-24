import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Alert
} from 'react-native';
import { H1, H2, H3, H4, P } from '../components/Text';
import {
  ViewContainer,
  Heading,
  SubHeading,
  PaperSheet,
  PadContainer
} from '../components/Base';
import { Button } from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCode from 'react-native-qrcode';
import _ from 'lodash';

const USER_DATA_STORE = 'USER_DATA_STORE';

export default class Profile extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {user:{}, scanner:false};
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

  switchScanner(){
      this.setState({scanner: true});
  }

  onSuccess(e) {
      alert(e.data);
      // TODO: should be a modal instead
  }

  async componentDidMount(){
      this.setState({user: JSON.parse(await AsyncStorage.getItem(USER_DATA_STORE))});
      //console.error(this.state.user.user_data.first_name);
  }

  render() {
    const scannerView = (() => {
        return(
            <ViewContainer>
              <PadContainer>
              <QRCodeScanner
                  ref={(node) => { this.scanner = node;
                  this.scanner.reactivate() }}
                  onRead={this.onSuccess.bind(this)}
                />
              </PadContainer>
            </ViewContainer>
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
                      {this.state.user.user_data && <Heading>
                          {fullName}
                      </Heading>}
                      <SubHeading>
                        Organizer
                      </SubHeading>
                      <Button onPress={() => this.switchScanner()}>
                        Open Scanner
                      </Button>
                      <Button mode="contained" onPress={() => this.logout()}>
                        Logout
                      </Button>
                    </PadContainer>

                  </ViewContainer>
                );

            } else { // otherwise this person is a hacker
                return (
                  <ViewContainer>
                    <PadContainer>
                      {this.state.user.user_data && <Heading>
                          {fullName}
                      </Heading>}
                      <SubHeading>
                        Your QR code
                      </SubHeading>
                      {this.state.user.user_data && <QRCode
                          value={fullName}
                          size={200}
                          bgColor='black'
                          fgColor='white'/>}
                      <SubHeading>
                        Use this code for check-in
                      </SubHeading>
                      <Button  mode="contained" onPress={() => this.logout()}>
                        Logout
                      </Button>
                    </PadContainer>

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
