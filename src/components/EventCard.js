import React, { Component, Fragment } from 'react';
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { H2, H3, H6 } from '../components/Text';
import { PadContainer } from './Base';
import { colors } from './Colors';
import EventModal from './EventModal';
import EventDescription from './schedule/EventDescription';

const styles = StyleSheet.create({
  event: {
    marginBottom: 15,
  },
  darkImageMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  textGroup: {
    marginBottom: 40,
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageBg: {
    position: 'relative',
  },
  happeningTitle: {
    fontWeight: 'bold',
    color: colors.textColor.primary,
  }
});

export default class EventCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  renderModal() {
    return <EventModal
      isModalVisible={this.state.isModalVisible}
      toggleModal={this.toggleModal}
      eventManager={this.props.eventManager}
      event={this.props.event}
      origin={'Home'}
    />
  }

  render() {
    const { big, event, eventManager, inSlideshow } = this.props;
    const dimensions = require('Dimensions').get('window');
    let imageWidth = big ? dimensions.width - 40 : dimensions.width / 2 - 30;
    imageWidth = inSlideshow ? dimensions.width : imageWidth;
    const imageHeight = Math.round((imageWidth * 38) / 67);


    let titleClipped = event.title;
    let titleLimit = 30;
    if (titleClipped && titleClipped.length > titleLimit) {
      titleClipped = titleClipped.substring(0, titleLimit) + "…";
    }

    //let imgName = big ? event.img + "_big" : event.img;
    let imgName = '';

    return (
      <View>
        {this.renderModal()}
        <TouchableOpacity
          onPress={() => this.toggleModal()}
          activeOpacity={inSlideshow ? 0.7 : 0.2}
        >
          <View style={styles.event}>
            {!inSlideshow ?
              (<React.Fragment>
                <Image
                  style={[
                    {
                      width: imageWidth,
                      height: big ? imageHeight / 2 : imageHeight,
                      borderRadius: 4,
                      marginBottom: 5,
                    },
                    this.props.imageStyle
                  ]}
                  source={require('../../assets/imgs/filler.png')}
                />
                {!big &&
                  <View>
                    <H3>{titleClipped}</H3>
                    <H6 style={{ opacity: .8 }}>
                      <Icon name="star" size={12} color={colors.iconColor} />{' '}
                      {eventManager.getSavedCount(event.eventID)}
                    </H6>
                  </View>
                }
              </React.Fragment>)
              : (
              <ImageBackground
                style={[
                  styles.imageBg,
                  { width: imageWidth, height: imageHeight,}
                ]}
                source={require('../../assets/imgs/filler.png')}
              >
                <View style={styles.darkImageMask}>
                  <PadContainer style={styles.textGroup}>
                    <H3 style={styles.happeningTitle}>HAPPENING NOW</H3>
                    <H2 style={{ color: colors.textColor.primary, }}>{titleClipped}</H2>
                  </PadContainer>
                </View>
              </ImageBackground>
            )}
          </View>
          {big &&
            <EventDescription
              {...this.props}
              disabled
            />
          }
        </TouchableOpacity>
      </View>
    );
  }
}
