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
import EventDescription from './schedule/EventDescription';

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
      eventManager={this.props.eventManager}
      event={this.props.event}
    />
  }

  render() {
    const { big, event, eventManager } = this.props;
    const dimensions = require('Dimensions').get('window');
    const imageWidth = big ? dimensions.width - 40 : dimensions.width / 2 - 30;
    const imageHeight = Math.round((imageWidth * 38) / 67);

    let titleClipped = event.title;
    let titleLimit = 30;
    if (titleClipped && titleClipped.length > titleLimit) {
      titleClipped = titleClipped.substring(0, titleLimit) + "…";
    }

    let imgName = big ? event.img + "_big" : event.img;

    return (
      <View>
        {this.renderModal()}
        <TouchableOpacity onPress={() => this.toggleModal()}>
          <View style={styles.event}>
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
              source={Images[imgName]}
            />
            {big ? null : (
              <View>
                <H3>{titleClipped}</H3>
                <H6 style={{ opacity: .8 }}>
                  <Icon name="heart" size={12} color={colors.white} />{' '}
                  {eventManager.getSavedCount(event.eventID)}
                </H6>
              </View>
            )}
          </View>
          {
            big ?
            <EventDescription
              {...this.props}
              disabled
            />
            :
            null
          }
        </TouchableOpacity>
      </View>
    );
  }
}
