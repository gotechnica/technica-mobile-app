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
    flexDirection: "column",
    paddingLeft: 0,
    paddingRight: 0
  },
  row: {
    flexDirection: "row",
  },
  disabled: {
    //opacity: 0.3
  },
  badge: {
    borderRadius: 4,
    marginTop: 5,
    height: 20
  },
  badgeTxt: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: -2
  },
  eventcard: {
    padding: 12.5
    //marginTop: -5
    //padding: 15,
    //borderBottomColor: colors.textColor.light,
    //borderBottomWidth: 1,
  }
});

const badgeColors = {
  red: '255, 59, 48',
  yellow: '255, 149, 0',
  green: '79, 217, 100',
  blue: '0, 122, 255',
};

const opacity = ', 0.2';

const badgeStyle = {
  red: { bgColor: 'rgba(' + badgeColors.red + opacity + ')', text: 'rgb(' + badgeColors.red + ')' },
  yellow: { bgColor: 'rgba(' + badgeColors.yellow + opacity + ')', text: 'rgb(' + badgeColors.yellow + ')' },
  green: { bgColor: 'rgba(' + badgeColors.green + opacity + ')', text: 'rgb(' + badgeColors.green + ')' },
  blue: { bgColor: 'rgba(' + badgeColors.blue + opacity + ')', text: 'rgb(' + badgeColors.blue + ')' },
};

const badgeStyles = {
  'Main': badgeStyle.green,
  'Food': badgeStyle.red,
  'Workshop': badgeStyle.blue,
  'Misc': badgeStyle.blue,
  'Sponsor': badgeStyle.yellow,
  'Mentor': badgeStyle.yellow,
  'Campfire': badgeStyle.green
};

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
    console.log(event)
    return (
      <Fragment>
        {this.renderModal()}
        <TouchableOpacity
          disabled={disabled}
          style={event.hasPassed ? [this.props.style, styles.disabled] : this.props.style}
          onPress={() => this.toggleModal()}
        >
          <View style={[styles.row, styles.eventcard]}>
            <View style={[styles.col, { flex: 4 }]}>
              <H3 style={{ fontSize: 20 }}>{event.title}</H3>
              {/*<H4 style={{ color: colors.textColor.light }}>
                {event.startTime == event.endTime
                  ? `${event.startTimeFormatted}`
                  : `${event.startTimeFormatted} - ${event.endTimeFormatted}`}
              </H4>*/}
              <H4 style={{ fontSize: 17.5, color: colors.textColor.light }}>{event.location}</H4>
                  <Text>
                  {(event.category == 'Misc' ? 'Mini-Event' : event.category).toUpperCase()}
                  </Text>
            </View>
            <View style={[styles.row, { flex: 1, justifyContent: "flex-end", alignItems: 'center'}]}>
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
