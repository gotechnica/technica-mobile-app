import React, { Component, Fragment } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  SafeAreaView
} from 'react-native';
import Images from '../../assets/imgs/index';
import { H1, H2, H3, H4, H6, P } from '../components/Text';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { ModalContent, ModalHeader, HorizontalLine, Spacing, modalStyle } from './Base';
import { colors } from './Colors';
import moment from 'moment';
import PhotoView from 'react-native-photo-view';
import Accordion from '@ercpereda/react-native-accordion';


export default class MapModal extends Component {
  render() {
    const props = this.props;
    const dimensions = require('Dimensions').get('window');
    const imageWidth = dimensions.width - 42;
    const imageHeight = Math.round((imageWidth * 38) / 67);
    const styles = {width: window.width, height: window.height, overflow:'visible'};

    return (
      <Modal
        isVisible={props.isModalVisible}
        backdropColor="#000000"
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
        <ModalContent style={{ padding: 0 }}>
          <View style={{ padding: 20, paddingBottom: 0 }}>
            <ModalHeader
              heading="Venue Map"
              onBackButtonPress={() => props.toggleModal()}
            />
          </View>
          <PhotoView
            source={require('./images/floor_plan_final.png')}
            minimumZoomScale={1}
            maximumZoomScale={8}
            androidScaleType="fitCenter"
            onLoad={() => console.log("Image loaded!")}
            style={{
              width: window.width,
              height: 600,
            }}
          />
        </ModalContent>
      </Modal>
    );
  }
}
