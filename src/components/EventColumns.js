import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  PadContainer,
  Spacing,
  Button,
  ModalContent,
  ModalHeader,
} from './Base';
import EventCard from './EventCard';
import PropTypes from 'prop-types';
import { H3 } from '../components/Text';
import Modal from "react-native-modal";
import { colors } from './Colors';

const CLIP_LIMIT = 6;

const styles = StyleSheet.create({
  columnContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  column: {
    flex: 5,
    flexDirection: 'column',
  },
  event: {
    marginBottom: 15,
  },
});

export default class EventColumns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.getColumns = this.getColumns.bind(this);
  }



  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  getColumns(isClipped) {
    const { eventsArr } = this.props;

    // If empty
    if (eventsArr.length == 0) {
      return (
        <H3 style={{ textAlign: 'left', marginLeft: 20, opacity: 0.8 }}>
          No events at this time.
        </H3>
      );
    }

    // Separate into two columns
    const leftList = [];
    const rightList = [];
    // If clipping, limit to CLIP_LIMIT, else show it all
    const limit =
      (isClipped) ?
        (eventsArr.length >= CLIP_LIMIT) ? CLIP_LIMIT : eventsArr.length
        :
        eventsArr.length;

    for (let i = 0; i < limit; i++) {
      const currEvent = eventsArr[i];
      const currEventCard = (
        <EventCard
          {...currEvent}
          key={currEvent.name}
        />
      );

      // Even goes on left
      if (i == 0 || i % 2 == 0) {
        leftList.push(currEventCard);
      // Odd goes on right
      } else {
        rightList.push(currEventCard);
      }
    }

    const { width, height } = require('Dimensions').get('window');

    return (
      <View style={{ flex: 1 }}>
        <PadContainer
          style={
            [styles.columnContainer,
            { marginLeft: (isClipped == false) ? -20 : 0 },
            { width: width }]
          }
        >
          <View style={styles.column}>
            {leftList}
          </View>
          <View style={{width: 20}}></View>
          <View style={styles.column}>
            {rightList}
          </View>
        </PadContainer>

        {
          isClipped && eventsArr.length > CLIP_LIMIT ?
            <TouchableOpacity onPress={() => this.toggleModal()}>
              <Button text="View All" />
            </TouchableOpacity>
            :
            null
        }
      </View>
    );
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
      >
        <ModalContent>
          <ModalHeader
            onBackButtonPress={() => this.toggleModal()}
            heading={this.props.heading}
          />
          { this.getColumns(false) }
        </ModalContent>
      </Modal>
    )
  }

  render() {
    const { width, height } = require('Dimensions').get('window');
    return (
      <View style={{ flex: 1 }}>
        { this.state.showModal ? this.renderModal() : null }
        { this.getColumns(true) }
      </View>
    );
  }
}

EventColumns.propTypes = {
  eventsArr: PropTypes.array,
  heading: PropTypes.string.isRequired,
};

EventColumns.defaultProps = {
  eventsArr: [],
};
