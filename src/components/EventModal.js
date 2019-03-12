import moment from 'moment';
import React, { Component, Fragment } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

import { H2, H3, H4, P } from '../components/Text';
import { HorizontalLine, ModalContent, ModalHeader, modalStyle, Spacing } from './Base';
import { colors } from './Colors';
import PillBadge from "./PillBadge";

// TODO TECH DEBT: Replace <Spacing /> with proper margins

export default class EventModal extends Component {
  render() {
    const props = this.props;
    const dimensions = require('Dimensions').get('window');
    const imageWidth = dimensions.width;
    const imageHeight = Math.round((imageWidth * 38) / 67);
    const img = props.event.img + "_big";
    return (
      <Modal
        isVisible={props.isModalVisible}
        backdropColor={colors.backgroundColor.normal}
        backdropOpacity={1}
        animationInTiming={250}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        animationOutTiming={300}
        backdropTransitionInTiming={250}
        backdropTransitionOutTiming={300}
        avoidKeyboard={true}
        onBackButtonPress={() => props.toggleModal()}
        style={modalStyle}
      >
        <ModalContent>
          <ModalHeader
            onBackButtonPress={() => props.toggleModal()}
            eventID={props.event.eventID.toString()}
            eventManager={props.eventManager}
            heart
            noArrow
            small
          />
          <Image
              style={[
                styles.banner,
                {
                  width: imageWidth,
                  height: imageHeight,
                }
              ]}
              // source={Image[img]}
              source={require('../../assets/imgs/filler.png')}
            />
          <ScrollView>
            <View style={styles.viewWithSpacing}>
              <View>
                <H2>{props.event.title}</H2>
                <H3 style={styles.location}>{props.event.location}</H3>
              </View>
              {/*TODO replace with actual pill*/}
              <PillBadge category={props.event.category} from={'Modal'}/>
            </View>
            <View style={styles.viewWithSpacing}>
              <View>
                <H3 style={styles.date}>
                  {moment(props.event.endTime).format('dddd, MMMM D, YYYY')}
                </H3>
                <H3 style={styles.date}>
                  {
                    props.event.startTimeFormatted === props.event.endTimeFormatted ?
                      `${props.event.startTimeFormatted}`
                      :
                      `from ${props.event.startTimeFormatted} - ${props.event.endTimeFormatted}`
                  }
                </H3>
              </View>
            </View>
            {props.event.beginnerFriendly && (
              <View style={styles.viewWithSpacing}>
                <H4 style={{ color: colors.secondaryColor }}>BEST FOR BEGINNERS</H4>
              </View>
            )}
            <P style={styles.viewWithSpacing}>{props.event.description}</P>
          </ScrollView>
        </ModalContent>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  date: {
    color: colors.textColor.light,
  },
  banner: {
    marginLeft: -20, // Used to offset the padding on everything else in the modal
    marginTop: 5,
  },
  viewWithSpacing: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  location: {
    color: colors.primaryColor,
    marginVertical: 3,
  },
  eventTitle: {
    fontSize: 25,
  }
});
