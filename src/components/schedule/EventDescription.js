import React, { Fragment, Component } from 'react';

import { Platform, TouchableOpacity, StyleSheet, Text, View } from 'react-native';

import {
  GradientBackground,
  ViewContainer,
  PadContainer,
  Heading
} from '../Base';

import { H1, H2, H3, H4, P } from '../Text';
import { colors } from '../Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import EventModal from '../EventModal';
import { normalizeTimeLabel } from '../../actions/util.js';

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
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

    // this.customizeNotification = this.props.customizeNotification;
    // this.scheduleNotification = this.props.scheduleNotification;

    // AsyncStorage.getItem(EVENT_FAVORITED_KEY_PREFIX + this.props.eventKey.toString(), (err, results) => {
    //   //retrieve whether the event was favorited and update state to reflect change
    //   if(results != null && results != 'null'){
    //     console.log("myId: " + this.props.eventKey.toString() + " isFavorited: " + results)
    //     this.setState((prevState, props) => {return {favorited : JSON.parse(results)}});
    //   } else {
    //     this.setState((prevState, props) => {return {favorited : false}});
    //
    //     //update status to not favorited
    //     AsyncStorage.setItem(EVENT_FAVORITED_KEY_PREFIX + this.props.eventKey.toString(), JSON.stringify(false), function(error){
    //       if(error){
    //         console.log(error);
    //       }
    //     });
    //   }
    // });
  }

  toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  renderModal() {
    return <EventModal
      isModalVisible={this.state.isModalVisible}
      toggleModal={this.toggleModal}
      {...this.props}
    />
  }

  render() {
    const { hasModal } = this.props;
    return (
      <Fragment>
        {this.renderModal()}
        <TouchableOpacity disabled={!hasModal} style={this.props.style} onPress={() => this.toggleModal()}>
          <View style={[styles.row]}>
              <View style={[styles.col, { flex: 4 }]}>
                <H3>{this.props.title}</H3>
                <H4 style={{ color: colors.fontGrey }}>
                  {this.props.startTime == this.props.endTime
                    ? `${this.props.startTimeFormatted}`
                    : `${this.props.startTimeFormatted} - ${this.props.endTimeFormatted}`}
                </H4>
                <H4 style={{ color: colors.fontGrey }}>{this.props.location}</H4>
              </View>
              <View style={[styles.row, { flex: 1, justifyContent: 'flex-end' }]}>
                <H3 style={{ marginRight: 8, marginTop: 2 }}>
                  {this.props.savedCount}
                </H3>
                <TouchableOpacity>
                  <Icon
                    name={this.state.favorited ? 'heart' : 'heart-o'}
                    size={22}
                    color={colors.pink}
                  />
                </TouchableOpacity>
              </View>
          </View>
        </TouchableOpacity>
      </Fragment>
    );
  }
}
