import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  PadContainer,
  Spacing,
  Button,
  ModalContent,
  modalStyle,
  ModalHeader,
} from './Base';
import EventCard from './EventCard';
import PropTypes from 'prop-types';
import { H3 } from '../components/Text';
import Modal from 'react-native-modal';
import { colors } from './Colors';

const CLIP_LIMIT = 6;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  halfColumn: {
    flex: 5,
    flexDirection: 'column'
  },
  event: {
    marginBottom: 15
  }
});

export default class EventColumns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    // this.getColumns = this.getColumns.bind(this);
    this.getRows = this.getRows.bind(this);
    this.getCardCol = this.getCardCol.bind(this);
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  getCardCol(event) {
    if (event) {
      return (
        <View style={styles.halfColumn}>
          <EventCard
            event = {event}
            eventManager={this.props.eventManager}
          />
        </View>
      );
    } else {
      return null;
    }
  }

  getRows(isClipped) {
    const { eventsArr } = this.props;
    const { width } = require('Dimensions').get('window');

    const limit = isClipped
      ? eventsArr.length >= CLIP_LIMIT
        ? CLIP_LIMIT
        : eventsArr.length
      : eventsArr.length;

    // If empty
    if (eventsArr.length == 0) {
      return (
        <H3 style={{ textAlign: 'left', marginLeft: 20, opacity: 0.8 }}>
          No events at this time.
        </H3>
      );
    }

    const rows = [];
    for (let i = 0; i < limit; i += 2) {
      const left = eventsArr[i];
      const right = eventsArr[i + 1];
      rows.push(
        <PadContainer
          key={i}
          style={[
            styles.row,
            { marginLeft: isClipped == false ? -20 : 0 },
            { width: width }
          ]}
        >
          { this.getCardCol(left) }
          <View style={{ width: 20 }} />
          { this.getCardCol(right) }
        </PadContainer>
      );
    }

    const viewAllButton = isClipped && eventsArr.length > CLIP_LIMIT ?
      (
        <TouchableOpacity key="viewButton" onPress={() => this.toggleModal()}>
          <Button text="View All" />
        </TouchableOpacity>
      ) : null

    return [rows, viewAllButton];
  }

  renderModal() {
    return (
      <Modal
        isVisible={this.state.showModal}
        backdropColor={colors.black}
        backdropOpacity={1}
        animationInTiming={250}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        animationOutTiming={300}
        backdropTransitionInTiming={250}
        backdropTransitionOutTiming={300}
        avoidKeyboard={true}
        onBackButtonPress={() => this.toggleModal()}
        style={modalStyle}
      >
        <ModalContent>
          <ModalHeader
            onBackButtonPress={() => this.toggleModal()}
            heading={this.props.heading}
            eventManager={this.props.eventManager}
          />
          {this.getRows(false)}
        </ModalContent>
      </Modal>
    );
  }

  render() {
    const { width, height } = require('Dimensions').get('window');
    return (
      <View style={{ flex: 1 }}>
        {this.renderModal()}
        {this.getRows(true)}
      </View>
    );
  }
}

EventColumns.propTypes = {
  eventsArr: PropTypes.array,
  heading: PropTypes.string.isRequired
};

EventColumns.defaultProps = {
  eventsArr: []
};
