import React, { Component, Fragment } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  SafeAreaView
} from "react-native";
import Images from "../../assets/imgs/index";
import { H1, H2, H3, H4, H6, P } from "../components/Text";
import Icon from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import {
  ModalContent,
  ModalHeader,
  HorizontalLine,
  Spacing,
  modalStyle
} from "./Base";
import { colors } from "./Colors";
import moment from "moment";
import PhotoView from "react-native-photo-view";

export default class EventListModal extends Component {
  renderPopularEventsSection = () => {
    const heading = "Popular Events";
    const events = this.props.eventManager.getTopEvents(24);
    return (
      <View style={styles.subSection}>
        <PadContainer style={styles.subSectionHeading}>
          <H2>{heading}</H2>
        </PadContainer>
        <View>
          <EventColumns
            heading={heading}
            eventsArr={events}
            eventManager={this.props.eventManager}
          />
        </View>
      </View>
    );
  };

  renderBestForBeginnersSection = () => {
    const heading = "Best for Beginners";
    const events = this.props.eventManager.getBeginnerEventsArray();
    return (
      <View style={styles.subSection}>
        <PadContainer style={styles.subSectionHeading}>
          <H2>{heading}</H2>
        </PadContainer>
        <EventColumns
          heading={heading}
          eventsArr={events}
          eventManager={this.props.eventManager}
        />
      </View>
    );
  };

  render() {
    const props = this.props;
    const dimensions = require("Dimensions").get("window");
    const imageWidth = dimensions.width - 42;
    const imageHeight = Math.round((imageWidth * 38) / 67);
    const styles = {
      width: window.width,
      height: window.height,
      overflow: "visible"
    };

    return (
      <Modal
        isVisible={this.state.eventsListModalVisible}
        backdropColor={colors.black}
        backdropOpacity={1}
        animationInTiming={250}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        animationOutTiming={300}
        backdropTransitionInTiming={250}
        backdropTransitionOutTiming={300}
        avoidKeyboard={true}
        onBackButtonPress={() => this.toggleUpdatesModal()}
        style={modalStyle}
      >
        <ModalContent>
            {this.renderPopularEventsSection()}
            {this.renderBestForBeginnersSection()}
        </ModalContent>
      </Modal>
    );
  }
}
