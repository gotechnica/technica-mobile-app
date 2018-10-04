import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { H3 } from './Text';
import { colors } from './Colors';

export default class EventHeart extends Component {
  constructor(props) {
    super(props);
    this.handleHeartPress = this.handleHeartPress.bind(this);
  }

  handleHeartPress() {
    const { eventID, eventManager } = this.props;

    if (eventManager.isFavorited(eventID)) {
      eventManager.unfavoriteEvent(eventID)
    } else {
      eventManager.favoriteEvent(eventID, 10)
    }
  }

  render() {
    const { eventManager, eventID } = this.props;

    return (
      <View
        ref={myHeart => {
          this.myHeart = myHeart;
          console.log(myHeart);
          eventManager.registerComponentListener(myHeart);
        }}>
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
      </View>
    )
  }
}

EventHeart.propTypes = {
  eventID: PropTypes.number,
  savedCount: PropTypes.number,
  eventManager: PropTypes.object,
};
