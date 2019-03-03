import React, { Fragment, Component } from "react";

import {
  Platform,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from "react-native";

import {
  GradientBackground,
  ViewContainer,
  PadContainer,
  Heading
} from "../Base";

import { H1, H2, H3, H4, P } from "../Text";
import { colors } from "../Colors";
import Icon from "react-native-vector-icons/FontAwesome";
import EventModal from "../EventModal";
import { normalizeTimeLabel } from "../../actions/util.js";
import EventStar from "../EventStar";

const styles = StyleSheet.create({
  column: {
    flexDirection: "column"
  },
  row: {
    flexDirection: "row"
  },
  disabled: {
    //opacity: 0.3
  }
});

export default class EventDescription extends Component<Props> {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      favorited: false,
      isModalVisible: false
    };
  }

  toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  renderModal() {
    return (
      <EventModal
        isModalVisible={this.state.isModalVisible}
        toggleModal={this.toggleModal}
        {...this.props}
      />
    );
  }

  render() {
    const {
      disabled,
      event,
      eventManager
    } = this.props;

    return (
      <Fragment>
        {this.renderModal()}
        <TouchableOpacity
          disabled={disabled}
          style={event.hasPassed ? [this.props.style, styles.disabled] : this.props.style}
          onPress={() => this.toggleModal()}
        >
          <View style={[styles.row]}>
            <View style={[styles.col, { flex: 4 }]}>
              <H3>{event.title}</H3>
              <H4 style={{ color: colors.textColor.light }}>
                {event.startTime == event.endTime
                  ? `${event.startTimeFormatted}`
                  : `${event.startTimeFormatted} - ${event.endTimeFormatted}`}
              </H4>
              <H4 style={{ color: colors.textColor.light }}>{event.location}</H4>
            </View>
            <View style={[styles.row, { flex: 1, justifyContent: "flex-end" }]}>
              <EventStar
                ref={myStar => {
                  this.myStar = myStar;
                  eventManager.registerHeartListener(myStar);
                }}
                eventID={event.eventID.toString()}
                eventManager={eventManager}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Fragment>
    );
  }

  componentWillUnmount() {
    this.props.eventManager.removeHeartListener(this.myStar);
  }
}
