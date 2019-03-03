import React, { Component } from 'react';
import { H3, H6 } from "../components/Text";
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import {
    Text,
    View,
    Image,
} from 'react-native';
import EventCard from "./EventCard";

const { width } = require("Dimensions").get("window");

const styles = {
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        paddingLeft: 20
      },
    wrapper: {
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
}

export default class HappeningNowSlideshow extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        position: 1,
        interval: null,
        dataSource: props.dataSource,
      };
    }
   
    componentWillMount() {
      this.setState({
        interval: setInterval(() => {
          this.setState({
            position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
          });
        }, 2000)
      });
    }
   
    componentWillUnmount() {
      clearInterval(this.state.interval);
    }
   
    render() {
        const { big, event, eventManager } = this.props;
        const dimensions = require('Dimensions').get('window');
        const imageWidth = dimensions.width - 20;
        const imageHeight = Math.round((imageWidth * 38) / 67);

        if (this.props.dataSource.length == 0) {
            return (
                <H3 style={{ textAlign: "left", marginLeft: 20, opacity: 0.8 }}>
                  No events at this time.
                </H3>
              );
        }
        slideshow_content = []
        for (i = 0; i < this.props.dataSource.length; i++) {
            slideshow_content.push(
                <EventCard key={i} event={this.props.dataSource[i]} eventManager={this.props.eventManager} big={true} />
            )
        }
        return (
        <Swiper style={styles.wrapper} height={240}
            onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
            dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
            activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
            paginationStyle={{
              bottom: -23, left: null, right: 10
            }} loop>
            {slideshow_content}
        </Swiper>
        );
    }
  }

HappeningNowSlideshow.propTypes = {
    dataSource: PropTypes.array.isRequired,
};