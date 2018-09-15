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
    this.handleHeartPress = this.handleHeartPress.bind(this);
  }

  handleHeartPress() {
    const { eventID } = this.props;
    if (this.state.favorited) {
      console.log("my state call unfav")
      eventManager.unfavoriteEvent(eventID)
    } else {
      console.log("my state call fav")

      eventManager.favoriteEvent(eventID, 10)
    }
  }

  render() {
    const { savedCount, eventManager } = this.props;


    console.log('my state', this.state);
    return (
      <Fragment>
        <H3 style={{ marginRight: 8, marginTop: 2 }}>
          {this.props.savedCount}
        </H3>
        <TouchableOpacity onPress={this.handleHeartPress}>
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
