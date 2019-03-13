import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';
import { StyleSheet } from 'react-native';
import { PadContainer } from "../components/Base";
import EventCard from "./EventCard";
import { H2, H3 } from '../components/Text';

const styles = StyleSheet.create({
    textIfNoEvents: {
      marginBottom: 10,
    },
});

export default class HappeningNowSlideshow extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    if (this.props.dataSource.length == 0) {
        return (
          <PadContainer>
            <H2 style={styles.textIfNoEvents}>Happening Now</H2>
            <H3>No events at this time.</H3>
          </PadContainer>
        );
    }

    slideshow_content = []
    for (i = 0; i < this.props.dataSource.length; i++) {
        slideshow_content.push(
          <EventCard
            key={i}
            event={this.props.dataSource[i]}
            eventManager={this.props.eventManager}
            origin={'Home'}
            inSlideshow
          />
        )
    }

    return (
      <Swiper
        height={240}
        onMomentumScrollEnd={(e, state) => console.log('index:', state.index)}
        dotColor={'rgba(255,255,255,.6)'}
        activeDotColor={'#fff'}
        loop
      >
        {slideshow_content}
      </Swiper>
    );
  }
}

HappeningNowSlideshow.propTypes = {
    dataSource: PropTypes.array.isRequired,
};
