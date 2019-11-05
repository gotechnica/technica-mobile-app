import React, { Component } from "react";
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
  FlatList
} from "react-native";
import { H1, H2, H3, H4, P } from "./Text";
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
  Button,
  ModalHeading
} from "./Base";
import QRCodeScanner from "react-native-qrcode-scanner";
import QRCode from "react-native-qrcode";
import _ from "lodash";
import { colors } from "../components/Colors";
import Modal from "react-native-modal";
import FAIcon from "react-native-vector-icons/FontAwesome";
import PhotoView from "react-native-photo-view";
import MapTabBar from "./map/MapTabBar";


export default class MapModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayVenue: true,
      venueActive: true,
      parkingActive: false,
    };

    this.toggleView = this.toggleView.bind(this);
  }

  toggleView() {
    this.setState({ 
      displayVenue: !this.state.displayVenue,
      venueActive: !this.state.venueActive,
      parkingActive: !this.state.parkingActive,
    });
  }

  // Checks which map to display
  displayManager() {
    if (this.state.displayVenue) {
      return "../components/images/floor_plan_final.png";
    } else {
      return "../components/images/parking.png";
    }
  }

  render() {
    const options = ["Venue", "Parking"];
    const props = this.props;

    return (
      <Modal
        isVisible={props.isModalVisible}
        backdropColor="#000000"
        backdropOpacity={1}
        animationInTiming={250}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        animationOutTiming={300}
        backdropTransitionInTiming={250}
        backdropTransitionOutTiming={300}
        avoidKeyboard={true}
        onBackButtonPress={() => props.toggleModal()}
        style={modalStyle}
      >
      <ModalContent style={{ padding: 0 }}>
          <View style={{ padding: 20, paddingBottom: 0 }}>
            <ModalHeader
              onBackButtonPress={() => props.toggleModal()}
            />
            <ModalHeading style={{marginTop: -25}}>Maps</ModalHeading>
                      <FlatList
            style={[styles.tabs, this.props.style]}
            data={options}
            renderItem={tabObj => {
              let isActive;
              if(tabObj.index == 0 && this.state.venueActive){
                isActive = true;
              } else if(tabObj.index == 1 && this.state.parkingActive){
                isActive = true;
              } else {
                isActive = false;
              }
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.toggleView()
                  }
                  style={[styles.tab, styles.tabActive]}
                >
                  <H2
                    style={isActive ? styles.activeText : styles.inactiveText}
                  >
                    {tabObj.item}&nbsp;
                  </H2>
                  {/* <View style={isActive ? styles.bottomBorder : styles.bottomBorderInactive }></View> */}
                </TouchableOpacity>
              );
            }}
            ItemSeparatorComponent={() => <H2>&nbsp;&nbsp;</H2>}
            horizontal={true}
            keyExtractor={(item, index) => item}
          />
          </View>
        {this.state.displayVenue && (
          <PhotoView
            source={{uri: 'https://technicamobileapp-images.s3.amazonaws.com/images/floor_plan_final.png'}}
            minimumZoomScale={1}
            maximumZoomScale={8}
            androidScaleType="fitCenter"
            onLoad={() => console.log("Image loaded!")}
            style={{
              width: window.width,
              height: 600
            }}
          />
        )}
        {!this.state.displayVenue && (
          <PhotoView
            source={{uri: 'https://technicamobileapp-images.s3.amazonaws.com/images/parking_map.png'}}
            minimumZoomScale={1}
            maximumZoomScale={8}
            androidScaleType="fitCenter"
            onLoad={() => console.log("Image loaded!")}
            style={{
              width: window.width,
              height: 600
            }}
          />
        )}
        </ModalContent>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  activeText: {
    color: colors.white
  },
  inactiveText: {
    color: colors.fontGrey
  },
  // bottomBorderInactive: {
  //   // alignSelf: 'stretch',
  //   // height: 2,
  //   // marginBottom: 10,
  //   // marginTop: 2,
  // },
  // bottomBorder: {
  //   // alignSelf: 'stretch',
  //   // backgroundColor: colors.white,
  //   // height: 2,
  //   // marginTop: 2,
  //   // marginBottom: 10,
  // },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40
    // marginVertical: 10,
  },
  tabs: {
    flexDirection: "row",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0
  }
});