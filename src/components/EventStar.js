import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { H3 } from './Text';
import { colors } from './Colors';

export default class EventStar extends Component {
  constructor(props) {
    super(props);
    this.handleHeartPress = this.handleHeartPress.bind(this);
  }

  handleHeartPress() {
    const { eventID, eventManager } = this.props;

    if (eventManager.isFavorited(eventID)) {
      eventManager.unfavoriteEvent(eventID)
    } else {
      eventManager.favoriteEvent(eventID)
    }
  }

  render() {
    const { eventManager, eventID } = this.props;

    return (
      <Fragment>
        <H3 style={{ marginRight: 8, marginTop: 5 }}>
          {eventManager.getSavedCount(eventID)}
        </H3>
        <TouchableOpacity onPress={this.handleHeartPress}>
          <Icon
            name={'star'}
            size={22}
            color={(eventManager.isFavorited(eventID)) ? colors.starColor.selected : colors.starColor.unselected}
          />
        </TouchableOpacity>
      </Fragment>
    )
  }
}

EventStar.propTypes = {
  eventID: PropTypes.string,
  eventManager: PropTypes.object,
};
