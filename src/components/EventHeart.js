import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { H3 } from './Text';
import { colors } from './Colors';

export default class EventHeart extends Component {
  constructor(props) {
    super(props);
    const { eventID, eventManager } = this.props;

    this.state = {
      favorited: eventManager.isFavorited(eventID),
    };
  }

  render() {
    const { savedCount, eventID, eventManager } = this.props;

    return (
      <Fragment>
        <H3 style={{ marginRight: 8, marginTop: 2 }}>
          {this.props.savedCount}
        </H3>
        <TouchableOpacity onPress={eventManager.favoriteEvent(eventID, 10)}>
          <Icon
            name={(this.state.favorited) ? 'heart' : 'heart-o'} // 'heart'
            size={22}
            color={colors.pink}
          />
        </TouchableOpacity>
      </Fragment>
    )
  }
}

EventHeart.propTypes = {
  eventID: PropTypes.number,
  savedCount: PropTypes.number,
  eventManager: PropTypes.object,
};
