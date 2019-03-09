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
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import EventStar from './EventStar';
import { ifIphoneX } from 'react-native-iphone-x-helper'
import Images from '../../assets/imgs/index';

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor.normal
  },
  padContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  modal: {
    flex: 1,
    backgroundColor: colors.backgroundColor.normal,
    padding: 20
  },
  spacing: {
    height: 15,
  },
  heading: {
    paddingTop: 30,
    marginBottom: 20,
    flexDirection: 'row',
  },
  subHeading: {
    color: colors.textColor.light,
    marginBottom: 40
  },
  paper: {
    //elevation: Platform.OS === 'ios' ? 4 : 6,
    //borderRadius: 4,
    // shadowColor: 'rgba(0, 0, 0, .6)',
    //shadowOpacity: .18,
    //marginBottom: 20,
    //marginLeft: 20,
    //marginRight: 20,
    //marginTop: 2,
    backgroundColor: colors.backgroundColor.white
  },
  paperHead: {

  },
  paperBody: {
    padding: 15,
  },
  white: {
    backgroundColor: 'white',
  },
  horizontalLine: {
    height: 1,
    backgroundColor: colors.borderColor.light
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
    backgroundColor: colors.primaryColor,
    // borderWidth: 1,
    // borderColor: colors.lavender,
    padding: 8,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: "center",
    color: colors.textColor.primary
  }
});

const PlainViewContainer = props => (
  <View style={{ backgroundColor: colors.backgroundColor.normal, flex: 1 }}>
    {props.children}
  </View>
);

const ViewContainer = props => (
  <PlainViewContainer>
    <ScrollView style={{ flex: 1 }}>
      <View style={[styles.container, props.style]}>{props.children}</View>
    </ScrollView>
  </PlainViewContainer>
);

const PadContainer = props => (
  <View style={[styles.padContainer, props.style]}>{props.children}</View>
);

const Heading = props =>
  props.logo ? (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        ...props.style
      }}
    >
      <Image
        source={Images.bitcamp_logo}
        style={{ width: 45, height: 45, marginBottom: -10 }}
      />
      <Heading style={{ marginLeft: 12 }}>{props.children}</Heading>
    </View>
  ) : (
    <View style={[styles.heading]}>
      <H1 style={props.style}>{props.children}</H1>
    </View>
  );

const SubHeading = props => (
  <View>
    <H2 style={[styles.subHeading, props.style]}>{props.children}</H2>
  </View>
);

const PaperSheet = props => (
  <Fragment>
    {/*props.heading ? <H2 style={styles.paperHead}>{props.heading}</H2> : null*/}
    <Paper style={styles.paper}>
      <View style={styles.paperBody}>{props.children}</View>
    </Paper>
  </Fragment>
);

const HorizontalLine = props => (
  <View style={[props.style, styles.horizontalLine]} />
);

const Spacing = props => <View style={styles.spacing} />;

const ModalContent = props => (
  <ScrollView>
    <View style={[styles.modal, props.style]}>{props.children}</View>
  </ScrollView>
);

class ModalHeader extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      onBackButtonPress,
      heart,
      noArrow,
      eventID,
      eventManager,
      small
    } = this.props;

    return (
      <View style={styles.modalHeader}>
        <View style={styles.modalHeaderNav}>
          <TouchableOpacity
            style={{ padding: 10, marginLeft: -10 }}
            onPress={onBackButtonPress}
          >
            <FAIcon name="chevron-left" size={22} color={colors.iconColor} />
          </TouchableOpacity>
          {heart &&
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <EventStar
                ref={myStar => {
                  this.myStar = myStar;
                  eventManager.registerHeartListener(myStar);
                }}
                eventID={eventID}
                eventManager={eventManager}
                discludeArrow={noArrow}
              />
            </View>
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
      this.props.eventManager.removeHeartListener(this.myStar);
    }
  }
}

const CenteredActivityIndicator = props => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10,
      backgroundColor: colors.backgroundColor.normal
    }}
  >
    <ActivityIndicator size="large" color={colors.primaryColor} />
  </View>
);
const Button = props => (
  <View>
    <View style={[styles.button, props.style]}>
      <H3 style={styles.buttonText}>{props.text}</H3>
    </View>
  </View>
);

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
