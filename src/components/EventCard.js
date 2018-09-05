import React, { Component, Fragment } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import Images from '../../assets/imgs/index';
import { H1, H2, H3, H4, H6, P } from '../components/Text';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { ModalContent, ModalHeader, HorizontalLine, Spacing } from './Base';
import { colors } from './Colors';
import EventModal from './EventModal';

const styles = StyleSheet.create({
  event: {
    // backgroundColor: 'black',
    marginBottom: 15
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
      {...this.props}
    />
  }

  render() {
    const { title, savedCount, img, big } = this.props;
    const dimensions = require('Dimensions').get('window');
    const imageWidth = big ? dimensions.width - 40 : dimensions.width / 2 - 30;
    const imageHeight = Math.round((imageWidth * 38) / 67);
    // TODO refactor "big" property, which is used on just the map on homescreen, to its own component

    let titleClipped = title;
    let titleLimit = 30;
    if (titleClipped && titleClipped.length > titleLimit) {
      titleClipped = titleClipped.substring(0, titleLimit) + "…";
    }

    return (
      <View>
        {big ? null : this.renderModal()}
        <TouchableOpacity onPress={() => this.toggleModal()}>
          <View style={styles.event}>
            <Image
              style={{
                width: imageWidth,
                height: imageHeight,
                borderRadius: 4,
                marginBottom: 5
              }}
              // source={Image[img]}
              source={Images[img]}
            />
            {big ? null : (
              <View>
                <H3>{titleClipped}</H3>
                <H6 style={{ opacity: .8 }}>
                  <Icon name="heart" size={12} color={colors.white} />{' '}
                  {savedCount}
                </H6>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
