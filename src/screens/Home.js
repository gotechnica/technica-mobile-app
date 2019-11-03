import React, { Component, Fragment } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Alert,
  Dimensions,
  ScrollView,
  FlatList,
  ImageBackground,
  SafeAreaView
} from "react-native";
import Images from "../../assets/imgs/index";
import { H1, H2, H3, H4, H6, P } from "../components/Text";
import {
  ViewContainer,
  Heading,
  SubHeading,
  PaperSheet,
  PadContainer,
  HorizontalLine,
  modalStyle,
  ModalContent,
  ModalHeader,
  NavModalHeader,
  Spacing,
  Button
} from "../components/Base";
import Modal from "react-native-modal";
import EventCard from "../components/EventCard";
import EventColumns from "../components/EventColumns";
import { colors } from "../components/Colors";
import Saved from "./Saved";
import MapModal from "../components/MapModal";
import ChallengeList from "../components/ChallengeList";
import EventListModal from "../components/EventListModal";
import CountdownTimer from "../components/CountdownTimer";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { FlatGrid } from "react-native-super-grid";
import PhotoView from "react-native-photo-view";
import Connect from "../components/Connect";
import About from "../components/About";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updates: [],
      isUpdatesModalVisible: false,
      isEventListModalVisible: false,
      isSavedModalVisible: false,
      isChallengesModalVisible: false,
      isAboutUsModalVisible: false,
      isConnectModalVisible: false,
      dataSource: {}
    };
    this.toggleUpdatesModal = this.toggleUpdatesModal.bind(this);
    this.toggleEventListModal = this.toggleEventListModal.bind(this);
    this.toggleSavedModal = this.toggleSavedModal.bind(this);
    this.toggleChallengesModal = this.toggleChallengesModal.bind(this);
    this.toggleConnectModal = this.toggleConnectModal.bind(this);
    this.toggleAboutUsModal = this.toggleAboutUsModal.bind(this);
  }

  componentWillUnmount() {
    const eventManager = this.props.screenProps.eventManager;
    eventManager.removeEventChangeListener(this.mySaved);
  }

  toggleUpdatesModal() {
    this.setState({ isUpdatesModalVisible: !this.state.isUpdatesModalVisible });
  }

  toggleEventListModal() {
    this.setState({
      isEventListModalVisible: !this.state.isEventListModalVisible
    });
  }

  toggleSavedModal() {
    this.setState({ isSavedModalVisible: !this.state.isSavedModalVisible });
  }

  toggleChallengesModal() {
    this.setState({
      isChallengesModalVisible: !this.state.isChallengesModalVisible
    });
  }

  toggleAboutUsModal() {
    this.setState({ isAboutUsModalVisible: !this.state.isAboutUsModalVisible });
  }

  toggleConnectModal() {
    this.setState({ isConnectModalVisible: !this.state.isConnectModalVisible });
  }

  renderChallengeList() {
    return (
      <Modal
        isVisible={this.state.isChallengesModalVisible}
        backdropColor={colors.black}
        backdropOpacity={1}
        animationInTiming={250}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        animationOutTiming={300}
        backdropTransitionInTiming={250}
        backdropTransitionOutTiming={300}
        avoidKeyboard={true}
        onBackButtonPress={() => this.toggleChallengesModal()}
        style={modalStyle}
      >
        <ModalContent style={{ padding: 0 }}>
          <View style={{ padding: 20, paddingBottom: 0 }}>
            <ModalHeader
              onBackButtonPress={() => this.toggleChallengesModal()}
              heading="Challenges"
            />
          </View>
          <ChallengeList />
        </ModalContent>
      </Modal>
    );
  }

  renderSavedModal = () => {
    return (
      <Modal
        isVisible={this.state.isSavedModalVisible}
        backdropColor={colors.black}
        backdropOpacity={1}
        animationInTiming={250}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        animationOutTiming={300}
        backdropTransitionInTiming={250}
        backdropTransitionOutTiming={300}
        avoidKeyboard={true}
        onBackButtonPress={() => this.toggleSavedModal()}
        style={modalStyle}
      >
        <ModalContent style={{ padding: 0 }}>
          <View style={{ padding: 20, paddingBottom: 0 }}>
            <ModalHeader onBackButtonPress={() => this.toggleSavedModal()} />
          </View>
          <View style={(styles.subSection, { marginTop: -40 })}>
            <Saved
              ref={mySaved => {
                this.mySaved = mySaved;
                this.props.eventManager.registerEventChangeListener(mySaved);
              }}
              eventManager={this.props.eventManager}
            />
          </View>
        </ModalContent>
      </Modal>
    );
  };

  renderAboutUsModal = () => {
    return (
      <Modal
        isVisible={this.state.isAboutUsModalVisible}
        backdropColor={colors.black}
        backdropOpacity={1}
        animationInTiming={250}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        animationOutTiming={300}
        backdropTransitionInTiming={250}
        backdropTransitionOutTiming={300}
        avoidKeyboard={true}
        onBackButtonPress={() => this.toggleAboutUsModal()}
        style={modalStyle}
      >
        <ModalContent>
          <ModalHeader onBackButtonPress={() => this.toggleAboutUsModal()} />
          <About />
        </ModalContent>
      </Modal>
    );
  };

  renderConnectModal = () => {
    return (
      <Modal
        isVisible={this.state.isConnectModalVisible}
        backdropColor={colors.black}
        backdropOpacity={1}
        animationInTiming={250}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        animationOutTiming={300}
        backdropTransitionInTiming={250}
        backdropTransitionOutTiming={300}
        avoidKeyboard={true}
        onBackButtonPress={() => this.toggleConnectModal()}
        style={modalStyle}
      >
        <ModalContent style={{ padding: 0 }}>
          <View style={{ padding: 20, paddingBottom: 0 }}>
            <ModalHeader onBackButtonPress={() => this.toggleConnectModal()} />
          </View>
          <View style={(styles.subSection, { marginTop: -40 })}>
            <Connect />
          </View>
        </ModalContent>
      </Modal>
    );
  };

  renderChallengesModal = () => {
    return (
      <Modal
        isVisible={this.state.isEventListModalVisible}
        backdropColor={colors.black}
        backdropOpacity={1}
        animationInTiming={250}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        animationOutTiming={300}
        backdropTransitionInTiming={250}
        backdropTransitionOutTiming={300}
        avoidKeyboard={true}
        onBackButtonPress={() => this.toggleChallengesModal()}
        style={modalStyle}
      >
        <ModalContent style={{ padding: 0 }}>
          <View style={{ padding: 20, paddingBottom: 0 }}>
            <ModalHeader
              onBackButtonPress={() => this.toggleChallengesModal()}
            />
          </View>
          <ChallengeList />
        </ModalContent>
      </Modal>
    );
  };

  renderEventListModal = () => {
    const popularHeading = "Popular Events";
    const beginnerHeading = "Best for Beginners";
    const popularEvents = this.props.eventManager.getTopEvents(24);
    const beginnerEvents = this.props.eventManager.getBeginnerEventsArray();
    return (
      <Modal
        isVisible={this.state.isEventListModalVisible}
        backdropColor={colors.black}
        backdropOpacity={1}
        animationInTiming={250}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        animationOutTiming={300}
        backdropTransitionInTiming={250}
        backdropTransitionOutTiming={300}
        avoidKeyboard={true}
        onBackButtonPress={() => this.toggleEventListModal()}
        style={modalStyle}
      >
        <ModalContent style={{ padding: 0 }}>
          <View style={{ padding: 20, marginTop: 20 }}>
            <NavModalHeader
              onBackButtonPress={() => this.toggleEventListModal()}
            />
          </View>
          <View style={styles.subSection}>
            <PadContainer style={styles.subSectionHeading}>
              <H2>{popularHeading}</H2>
            </PadContainer>
            <EventColumns
              heading={popularHeading}
              eventsArr={popularEvents}
              eventManager={this.props.eventManager}
            />
          </View>
          <View style={styles.subSection}>
            <PadContainer style={styles.subSectionHeading}>
              <H2>{beginnerHeading}</H2>
            </PadContainer>
            <EventColumns
              heading={beginnerHeading}
              eventsArr={beginnerEvents}
              eventManager={this.props.eventManager}
            />
          </View>
        </ModalContent>
      </Modal>
    );
  };

  // Renders the full list view of all updates
  renderUpdatesModal = () => (
    <Modal
      isVisible={this.state.isUpdatesModalVisible}
      backdropColor={colors.black}
      backdropOpacity={1}
      animationInTiming={250}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      animationOutTiming={300}
      backdropTransitionInTiming={250}
      backdropTransitionOutTiming={300}
      avoidKeyboard={true}
      onBackButtonPress={() => this.toggleUpdatesModal()}
      style={modalStyle}
    >
      <ModalContent>
        <ModalHeader
          onBackButtonPress={() => this.toggleUpdatesModal()}
          heading="Recent Updates"
        />
        <Spacing />
        {this.props.eventManager.getUpdates().map(update => (
          <View key={update.id}>
            <H4>{update.time}</H4>
            <H6>{update.body}</H6>
            <Spacing />
            <HorizontalLine />
            <Spacing />
          </View>
        ))}
      </ModalContent>
    </Modal>
  );

  // this is pretty gross, functions should be associated with items in render method
  modalManager(name) {
    if (name == "banner_popular") {
      this.toggleEventListModal();
    } else if (name == "banner_saved") {
      this.toggleSavedModal();
    } else if (name == "banner_challenges") {
      this.toggleChallengesModal();
    } else if (name == "banner_aboutus") {
      this.toggleAboutUsModal();
    } else if (name == "banner_connect") {
      this.toggleConnectModal();
    }
  }

  // Does not render anything if there are no recent updates yet
  renderUpdatesSection = () => {
    const updates = this.props.eventManager.getUpdates();
    const numUpdates = updates.length;
    return (
      // 20 less than real subsection padding to offset papersheet
      <View style={{ paddingBottom: 20 }}>
        {this.renderUpdatesModal()}
        {numUpdates > 0 ? (
          <Fragment>
            <PadContainer>
              <H2 style={styles.subSectionHeading}>Recent Updates</H2>
            </PadContainer>
            <TouchableOpacity onPress={() => this.toggleUpdatesModal()}>
              <PaperSheet>
                <H4>{updates[0].time}</H4>
                <H6>{updates[0].body}</H6>
                {numUpdates > 1 ? (
                  <Fragment>
                    <Spacing />
                    <HorizontalLine />
                    <Spacing />
                    <H6>
                      View {numUpdates - 1} other update
                      {updates.length > 2 ? "s" : null}
                    </H6>
                  </Fragment>
                ) : null}
              </PaperSheet>
            </TouchableOpacity>
          </Fragment>
        ) : null}
      </View>
    );
  };

  render() {
    const items = [
      { name: "banner_popular" },
      { name: "banner_saved" },
      { name: "banner_speakers" },
      { name: "banner_challenges" },
      { name: "banner_connect" },
      { name: "banner_aboutus" }
    ];

    return (
      <ViewContainer>
        <View style={styles.centerHeading}>
          <View style={styles.headingRow}>
            <Image style={styles.logo} source={Images["technica_logo"]} />
          </View>
          <CountdownTimer />
        </View>
        {this.renderUpdatesSection()}
        {this.renderEventListModal()}
        {this.renderSavedModal()}
        {this.renderAboutUsModal()}
        {this.renderChallengeList()}
        {this.renderConnectModal()}
        <ScrollView style={styles.scrollContainer}>
          <FlatGrid
            itemDimension={130}
            items={items}
            style={styles.gridView}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => this.modalManager(item.name)}>
                <View style={styles.itemContainer}>
                  <Image style={styles.banners} source={Images[item.name]} />
                </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </ViewContainer>
    );
  }
}

// TODO: Based off what I was saying about the proper height/width
// Say this on stackoverflow:
// const width = (Dimensions.get('window').width / cols) - (marginHorizontal * (cols + 1));
// const height = (Dimensions.get('window').height / rows) - (marginVertical * (rows + 1));

const styles = StyleSheet.create({
  bottomContainer: {
    // paddingBottom: 20,
    backgroundColor: "white"
  },
  centerHeading: {
    alignItems: "center",
    justifyContent: "center"
  },
  heading: {
    marginBottom: 20
  },
  headingRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  subSection: {
    // paddingTop: 20,
    paddingBottom: 40,
    paddingRight: 40,
    margin: 0
  },
  subSectionHeading: {
    paddingBottom: 20
  },
  columnContainer: {
    flex: 1,
    flexDirection: "row"
  },
  column: {
    flex: 5,
    flexDirection: "column"
  },
  event: {
    // backgroundColor: 'black',
    marginBottom: 15
  },
  logo: {
    // TODO: change fixed values so that they scale with different device sizes
    width: 250,
    height: 50,
    marginTop: 20,
    marginBottom: 20
  },
  sectionContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  boxContainer: {
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 4,
    marginRight: 4,
    width: Dimensions.get("window").width / 2 - 12,
    height: Dimensions.get("window").height / 2 - 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gold"
  },
  gridView: {
    marginTop: 5,
    flex: 1
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 1,
    height: 150,
    marginTop: Dimensions.get("window").height / 20
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600"
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff"
  },
  banners: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 20
  },
  shadow: {
    shadowOffset: { width: 4, height: 2 },
    shadowColor: "#464343",
    shadowOpacity: 0.5,
    elevation: 10,
    backgroundColor: "#0000"
  }
});
