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
  Fragment
} from "react-native";
import { H1, H2, H3, H4, P } from "../components/Text";
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
} from "../components/Base";
import QRCodeScanner from "react-native-qrcode-scanner";
import QRCode from "react-native-qrcode";
import _ from "lodash";
import { colors } from "../components/Colors";
import Modal from "react-native-modal";
import FAIcon from "react-native-vector-icons/FontAwesome";
import MapModal from "../components/MapModal";
import PhotoView from 'react-native-photo-view';

const FORCE_NORMAL_USER = false; // NOTE dangerous debug mode setting

const USER_DATA_STORE = "USER_DATA_STORE";

export default class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ViewContainer>
          <PadContainer>
              <Heading>Venue Map</Heading>
            </PadContainer>
          <PhotoView
            source={require("../components/images/floor_plan_final.png")}
            minimumZoomScale={1}
            maximumZoomScale={8}
            androidScaleType="fitCenter"
            onLoad={() => console.log("Image loaded!")}
            style={{
              width: window.width,
              height: 600
            }}
          />
      </ViewContainer>
    );
  }
}
