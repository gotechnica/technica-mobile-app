import moment from 'moment';
import React, { Component, Fragment } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

import { H2, H3, H4, P } from '../components/Text';
import { HorizontalLine, ModalContent, ModalHeader, modalStyle, Spacing } from './Base';
import { colors } from './Colors';
import PillBadge from "./PillBadge";
import Images from '../../assets/imgs/index';

// TODO TECH DEBT: Replace <Spacing /> with proper margins

export default class EventModal extends Component {
  render() {
    const props = this.props;
    const dimensions = require('Dimensions').get('window');
    const imageWidth = dimensions.width;
    const imageHeight = Math.round((imageWidth * 38) / 67);

    return (
      <Modal
        isVisible={props.isModalVisible}
        backdropColor={colors.backgroundColor.normal}
        backdropOpacity={1}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        animationInTiming={250}
        animationOutTiming={300}
        backdropTransitionInTiming={250}
        backdropTransitionOutTiming={300}
        avoidKeyboard={true}
        onBackButtonPress={() => props.toggleModal()}
        style={modalStyle}
      >
        <ModalContent>
          <ModalHeader
            onBackButtonPress={() => {props.toggleModal();}}
            eventID={props.event.eventID.toString()}
            eventManager={props.eventManager}
            origin={props.origin}
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
              source={Images[props.event.img]}
            />
          <ScrollView>
            <View style={styles.viewWithSpacing}>
              <View>
                <H2>{props.event.title}</H2>
                <View style={{ alignItems: 'flex-start', flexDirection:'row', paddingTop: 5, paddingBottom: 5 }}>
                {(Array.isArray(props.event.category) ? props.event.category : [props.event.category]).map((category,index) =>
                    <View style={{marginRight: 5}} key={props.event.title + index.toString()}>
                      <PillBadge category={category} from={'Modal'}/>
                    </View>
                )}
                </View>
                <H3 style={styles.location}>{props.event.location}</H3>
              </View>
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
            {props.event.featured && (
              <View style={styles.viewWithSpacing}>
                <H4 style={{ color: colors.secondaryColor }}>FEATURED EVENT</H4>
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
