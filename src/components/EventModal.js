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
import moment from 'moment';

// TODO TECH DEBT: Replace <Spacing /> with proper margins

export default class EventModal extends Component {
  render() {
    const props = this.props;
    const dimensions = require('Dimensions').get('window');
    const imageWidth = dimensions.width - 42;
    const imageHeight = Math.round((imageWidth * 38) / 67);
    const img = props.img + "_big";
    return (
      <Modal
        isVisible={props.isModalVisible}
        backdropColor={colors.black}
        backdropOpacity={1}
        animationInTiming={250}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        animationOutTiming={300}
        backdropTransitionInTiming={250}
        backdropTransitionOutTiming={300}
        avoidKeyboard={true}
        onBackButtonPress={() => props.toggleModal()}
      >
        <ModalContent>
          <ModalHeader
            onBackButtonPress={() => props.toggleModal()}
            savedCount={props.savedCount}
            eventID={props.eventID}
            eventManager={props.eventManager}
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
            source={Images[img]}
          />
          <ScrollView>
            <Spacing />
            <H2>{props.title}</H2>
            <Spacing />
            <H3>{props.startTimeFormatted} - {props.endTimeFormatted}</H3>
            <H3 style={styles.subtext}>{moment(props.endTime).format('dddd')}</H3>
            <Spacing />
            <H3>{props.location}</H3>
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
}

const styles = StyleSheet.create({
  subtext: {
    color: colors.fontGrey,
  },
});
