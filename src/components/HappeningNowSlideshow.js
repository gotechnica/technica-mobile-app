import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';

import { PadContainer } from '../components/Base';
import { H2, H3 } from '../components/Text';
import EventCard from './EventCard';

const { width } = require("Dimensions").get("window");

const styles = {
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    },
}

export default class HappeningNowSlideshow extends Component {
    constructor(props) {
      super(props);
    }
    
    render() {
        const { big, event, eventManager } = this.props;
        const dimensions = require('Dimensions').get('window');
        const imageWidth = dimensions.width - 20;
        const imageHeight = Math.round((imageWidth * 38) / 67);

        if (this.props.dataSource.length == 0) {
            return (
              <React.Fragment>
                <PadContainer style={styles}>
                  <H2>Happening Now</H2>
                </PadContainer>
                <H3 style={{ textAlign: "left", marginLeft: 20, opacity: 0.8 }}>
                  No events at this time.
                </H3>
              </React.Fragment>
            );
        }
        slideshow_content = []
        for (i = 0; i < this.props.dataSource.length; i++) {
            slideshow_content.push(
              <EventCard key={i} event={this.props.dataSource[i]} eventManager={this.props.eventManager} inSlideshow={true} />
            )
        }
        return (
        <Swiper
          height={240}
          onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
          dot={<View style={{backgroundColor: 'rgba(255,255,255,.6)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
          activeDot={<View style={{backgroundColor: '#fff', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
          paginationStyle={{
            bottom: 10
          }} 
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