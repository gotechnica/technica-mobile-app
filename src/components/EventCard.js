import React, { Component, Fragment } from 'react';
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { H2, H3, H6 } from '../components/Text';
import { PadContainer } from './Base';
import { colors } from './Colors';
import EventModal from './EventModal';
import EventDescription from './schedule/EventDescription';
import Images from '../../assets/imgs/index';

const styles = StyleSheet.create({
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
      origin={this.props.origin}
    />
  }

  render() {
    const { big, event, eventManager, inSlideshow } = this.props;
    const dimensions = require('Dimensions').get('window');
    let imageWidth = big ? dimensions.width - 40 : (dimensions.width / 2) + 10;
    imageWidth = inSlideshow ? dimensions.width : imageWidth;
    const imageHeight = Math.round((imageWidth * 38) / 67);

    let titleClipped = event.title;
    let titleLimit = 30;
    if (titleClipped && titleClipped.length > titleLimit) {
      titleClipped = titleClipped.substring(0, titleLimit) + "…";
    }
    return (
      <View>
        {this.renderModal()}
        <TouchableOpacity
          onPress={() => this.toggleModal()}
          activeOpacity={inSlideshow ? 0.7 : 0.2}
        >
          <View>
            {!inSlideshow ?
              (<React.Fragment>
                <Image
                  style={[
                    {
                      width: imageWidth,
                      height: big ? imageHeight / 2 : imageHeight,
                      borderRadius: 13,
                      marginBottom: 5,
                    },
                    this.props.imageStyle,
                  ]}
                  source={Images[event.img]}
                />
                {!big &&
                  <View>
                    <H3>{titleClipped}</H3>
                    <H6 style={{ opacity: .8 }}>
                      <Icon name="star" size={12} color={colors.starColor.selected} />{' '}
                      {eventManager.getSavedCount(event.eventID)}
                    </H6>
                  </View>
                }
              </React.Fragment>)
              : (
              <ImageBackground
                style={[
                  styles.imageBg,
                  { width: imageWidth, height: imageHeight }
                ]}
                source={Images[event.img]}
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
