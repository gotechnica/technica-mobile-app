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

  renderModal(props) {
    const dimensions = require('Dimensions').get('window');
    const imageWidth = dimensions.width - 42;
    const imageHeight = Math.round((imageWidth * 38) / 67);
    return (
      <Modal
        isVisible={this.state.isModalVisible}
        backdropColor={colors.black}
        backdropOpacity={1}
        animationInTiming={250}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        animationOutTiming={300}
        backdropTransitionInTiming={250}
        backdropTransitionOutTiming={300}
        avoidKeyboard={true}
        onBackButtonPress={() => this.toggleModal()}
      >
        <ModalContent>
          <ModalHeader
            onBackButtonPress={() => this.toggleModal()}
            savedCount={props.savedCount}
            heart
            small
          />
          <Image
            style={{
              width: imageWidth,
              height: imageHeight,
              marginTop: 20,
              borderRadius: 4,
              marginBottom: 20
            }}
            // source={Image[img]}
            source={Images[props.img]}
          />
          <ScrollView>
            <Spacing />
            <H3>12:00pm - 1:00pm</H3>
            <Spacing />
            <H2>{props.title}</H2>
            <H2>{props.location}</H2>
            <Spacing />
            <Spacing />
            <HorizontalLine />
            <Spacing />
            <Spacing />
            {props.beginnerFriendly ? (
              <Fragment>
                <H4 style={{ color: colors.lavender }}>BEGINNER FRIENDLY</H4>
                <Spacing />
              </Fragment>
            ) : null}
            <P>{props.description}</P>
          </ScrollView>
        </ModalContent>
      </Modal>
    );
  }

  render() {
    const { title, savedCount, img, big } = this.props;
    const dimensions = require('Dimensions').get('window');
    const imageWidth = big ? dimensions.width - 40 : dimensions.width / 2 - 30;
    const imageHeight = Math.round((imageWidth * 38) / 67);
    // TODO refactor "big" property, which is isolated to just the map on homescreen, to its own component
    return (
      <View>
        {big ? null : this.renderModal(this.props)}
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
                <H3>{title}</H3>
                <H6>
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
