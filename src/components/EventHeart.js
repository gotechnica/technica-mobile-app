import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { H3 } from './Text';
import { colors } from './Colors';
import Toast from 'react-native-simple-toast';

export default class EventHeart extends Component {
  constructor(props) {
    super(props);
    this.handleHeartPress = this.handleHeartPress.bind(this);
  }

  handleHeartPress() {
    const { eventID, eventManager } = this.props;

    if (eventManager.isFavorited(eventID)) {
      Toast.show('You will no longer be notified about this event.');
      eventManager.unfavoriteEvent(eventID)
    } else {
      Toast.show('You will be notified 15 min before this event.');
      eventManager.favoriteEvent(eventID)
    }
  }

  render() {
    const { eventManager, eventID } = this.props;

    return (
      <Fragment>
        <H3 style={{ marginRight: 8, marginTop: 2 }}>
          {eventManager.getSavedCount(eventID)}
        </H3>
        <TouchableOpacity onPress={this.handleHeartPress}>
          <Icon
            name={(eventManager.isFavorited(eventID)) ? 'heart' : 'heart-o'} // 'heart'
            size={22}
            color={colors.pink}
          />
        </TouchableOpacity>
      </Fragment>
    )
  }
}

EventHeart.propTypes = {
  eventID: PropTypes.string,
  eventManager: PropTypes.object,
};
