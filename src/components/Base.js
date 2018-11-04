import React, { Fragment, Component } from 'react';
import { colors } from './Colors';
import { H1, H2, H3, H4, P } from './Text';
import { Paper } from 'react-native-paper';
import {
  View,
  Platform,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import EventHeart from './EventHeart';
import { ifIphoneX } from 'react-native-iphone-x-helper'

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  padContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  modal: {
    flex: 1,
    backgroundColor: colors.black,
    padding: 20,
  },
  spacing: {
    height: 15,
  },
  heading: {
    paddingTop: 60,
    marginBottom: 20,
    flexDirection: 'row',
  },
  subHeading: {
    color: colors.fontGrey,
    marginBottom: 40,
  },
  paper: {
    elevation: Platform.OS === 'ios' ? 4 : 6,
    borderRadius: 4,
    // shadowColor: 'rgba(0, 0, 0, .6)',
    shadowOpacity: .18,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 2,
    backgroundColor: colors.darkGrey,
  },
  paperHead: {
    paddingLeft: 20,
    paddingBottom: 5,
    color: colors.cyan,
  },
  paperBody: {
    padding: 15,
  },
  white: {
    backgroundColor: 'white',
  },
  horizontalLine: {
    height: 1,
    backgroundColor: colors.borderGrey,
  },
  modalHeader: {
    ...ifIphoneX({
      marginTop: 40,
    }, {
      marginTop: 20,
    })
  },
  modalHeaderNav: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  modalHeadingText: {
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.darkGrey,
    // borderWidth: 1,
    // borderColor: colors.lavender,
    padding: 8,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.white,
  },
});


const PlainViewContainer = (props) => (
  <View style = {{ backgroundColor: colors.black, flex: 1}}>
    {props.children}
  </View>

)

const ViewContainer = (props) => (
  <PlainViewContainer>
    <ScrollView
      style={{ flex: 1 }}>
      <View style={[styles.container, props.style]}>
        {props.children}
      </View>
    </ScrollView>
  </PlainViewContainer>
);

const PadContainer = (props) => (
    <View style={[styles.padContainer, props.style]}>
      {props.children}
    </View>
)

const Heading = (props) => (
  <View style={[styles.heading]}>
    <H1 style={props.style}>
      {props.children}
    </H1>
  </View>
);

const SubHeading = (props) => (
  <View>
    <H2 style={[styles.subHeading, props.style]}>
      {props.children}
    </H2>
  </View>
);

const PaperSheet = (props) => (
  <Fragment>
    {
      props.heading ?
        <H4 style={styles.paperHead}>
          {props.heading}
        </H4>
      :
        null
    }
    <Paper style={styles.paper}>
      <View style={styles.paperBody}>
        {props.children}
      </View>
    </Paper>
  </Fragment>
);

const HorizontalLine = (props) => (
  <View style={[props.style, styles.horizontalLine]}></View>
);

const Spacing = (props) => (
  <View style={styles.spacing}></View>
);

const ModalContent = (props) => (
  <ScrollView>
    <View style={[styles.modal, props.style]}>
      {props.children}
    </View>
  </ScrollView>
)

class ModalHeader extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render () {
    const {
      onBackButtonPress,
      heart,
      eventID,
      eventManager,
      small
    } = this.props;

    return (
      <View style={styles.modalHeader}>
        <View style={styles.modalHeaderNav}>
          <TouchableOpacity style={{ padding: 10, marginLeft: -10 }} onPress={onBackButtonPress}>
            <FAIcon
              name="chevron-left"
              size={22}
              color={colors.white}
            />
          </TouchableOpacity>
          {
            heart ?
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <EventHeart
                ref={myHeart => {
                  this.myHeart = myHeart;
                  eventManager.registerHeartListener(myHeart);
                }}
                eventID={eventID}
                eventManager={eventManager}
              />
            </View>
              :
              null
          }
        </View>
        {
          small ?
            null
            :
            <H2 style={styles.modalHeadingText}>{this.props.heading}</H2>
        }
      </View>
    );
  }

  componentWillUnmount() {
    if(this.props.heart) {
      this.props.eventManager.removeHeartListener(this.myHeart);
    }
  }
}

const CenteredActivityIndicator = (props) => (
  <View style={{
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: colors.black
  }}>
    <ActivityIndicator size="large" color={colors.pink}/>
  </View>
)
const Button = (props) => (
  <View>
    <View style={[styles.button, props.style]}>
      <H3 style={styles.buttonText}>
        {props.text}
      </H3>
    </View>
  </View>
)

const modalStyle = { margin: 0 }

export {
  PlainViewContainer,
  ViewContainer,
  Heading,
  SubHeading,
  PaperSheet,
  PadContainer,
  HorizontalLine,
  Spacing,
  ModalContent,
  ModalHeader,
  modalStyle,
  CenteredActivityIndicator,
  Button
};
