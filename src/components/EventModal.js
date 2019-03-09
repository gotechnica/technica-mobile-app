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
import { ModalStyle, ModalContent, ModalHeader, HorizontalLine, Spacing, modalStyle } from './Base';
import { colors } from './Colors';
import moment from 'moment';

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
              <H3>{props.event.category}</H3>
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
            <P style={styles.viewWithSpacing}>{
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            /*props.event.description*/}</P>
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
