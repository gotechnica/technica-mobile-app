import React, { Component } from "react";
import { DefaultTheme, BottomNavigation } from "react-native-paper";
import Home from "./Home";
import Mentors from "./Mentors";
import Profile from "./Profile";
import Saved from "./Saved";
import Schedule from "./Schedule";
import Login from "./Login";
import CustomTabBar from "../components/CustomTabBar";
import { H5 } from "../components/Text";
import { colors } from "../components/Colors";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import ScrollableTabView from "react-native-scrollable-tab-view";
import { PushNotificationIOS, View, TouchableOpacity } from "react-native";
import { AsyncStorage, SafeAreaView, BackHandler, Platform } from "react-native";
import { Heading, PadContainer, ViewContainer } from "../components/Base";
import MapModal from "../components/MapModal";
import SearchModal from "../components/SearchModal";
import {Button, Image, Text, TouchableHighlight} from "react-native"
import firebase from "react-native-firebase";

const channelId = "bitcamp-push-notifications";
const channelName = "Bitcamp Announcements";

export default class AppContainer extends Component<Props> {
  static navigationOptions = ({navigation}) => ({
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      shadowColor: 'transparent'
    },
    headerTitleStyle: {
      textAlign: 'left',
      justifyContent: 'space-between',
      fontFamily: 'Aleo-Bold',
      fontSize: 25
    },
    headerRight:       
    navigation.getParam("showMapIcon") ?
    ( 
      <View>
        <View style={{flexDirection:"row", paddingRight: 15}}>
          <View style={{flex:1}}>
            <TouchableHighlight onPress={navigation.getParam("toggleMapModal")}>
              <Icon
                name="map"
                size={30}
                color="orange"
              />
            </TouchableHighlight>
          </View>
        </View>
        <MapModal
          isModalVisible={
            navigation.state.params
              ? navigation.getParam("isMapModalVisible")
              : false
          }
          toggleModal={() => navigation.state.params.toggleMapModal()}
        />
      </View>
    )
    :
    ( 
      <View>
        <View style={{flexDirection:"row", paddingRight: 15}}>
          <View style={{flex:1}}>
            <TouchableHighlight onPress={navigation.getParam("toggleSearchModal")}>
              <Icon
                name="magnifier"
                size={30}
                color="orange"
              />
            </TouchableHighlight>
          </View>
        </View>
        <SearchModal
          isModalVisible={
            navigation.state.params
              ? navigation.getParam("isSearchModalVisible")
              : false
          }
          toggleModal={() => navigation.state.params.toggleSearchModal()}
          eventDays={navigation.getParam("eventDays")}
          eventManager={navigation.getParam("eventManager")}
        />
      </View>
    ),
    headerLeft: (
      <View style={{flexDirection:"row", paddingLeft: 15}}>
        <View style={{flex:1}}>
          <Image
            source={require('../../assets/imgs/bitcamp-logo-icon.png')}
            style={{width: 40, height: 40}}
          />
        </View>
        <View style={{flex:1, paddingLeft: 15, paddingTop: 5}}>
          <Text style={{fontFamily: "Aleo-Bold", fontSize: 25}}>{navigation.getParam("title")}</Text>
        </View>
      </View>
    ),
  });

  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      isMapModalVisible: false
    };

    this.toggleMapModal = this.toggleMapModal.bind(this);
    this.toggleSearchModal = this.toggleSearchModal.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.props.navigation.setParams({
      title: "Bitcamp 2019",
      showMapIcon: true,
      isMapModalVisible: false,
      isSearchModalVisible: false,
      toggleMapModal: this.toggleMapModal,
      toggleSearchModal: this.toggleSearchModal,
      eventDays: this.props.screenProps.eventManager.getEventDays(),
      eventManager: this.props.screenProps.eventManager
    });
  }

  toggleMapModal = () => {
    this.props.navigation.setParams({
      isMapModalVisible: !(this.props.navigation.getParam("isMapModalVisible"))
    });
  };

  toggleSearchModal = () => {
    this.props.navigation.setParams({
      isSearchModalVisible: !(this.props.navigation.getParam("isSearchModalVisible"))
    });
  };

  render() {
    this.configureNotificationSettings();
    const eventManager = this.props.screenProps.eventManager;
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: colors.backgroundColor.normal }}
      >
        <ScrollableTabView
          tabBarPosition="bottom"
          locked
          style={{ backgroundColor: colors.backgroundColor.normal, paddingTop: 40 }}
          renderTabBar={() => <CustomTabBar />}
          onChangeTab={tab => {
            const tabIndex = tab.i;
            const tabNames = [
              "Bitcamp 2019",
              "Schedule",
              "Saved",
              "Mentors",
              "Profile"
            ];
            this.props.navigation.setParams({ title: tabNames[tabIndex] });
            if (tabIndex == 1) {
              this.props.navigation.setParams({ showMapIcon: false, eventDays: eventManager.getEventDays() });
            } else {
              this.props.navigation.setParams({ showMapIcon: true });
            }
          }}
        >
          <Home
            ref={myHome => {
              this.myHome = myHome;
              eventManager.registerEventChangeListener(myHome);
              eventManager.registerUpdatesListener(myHome);
            }}
            eventManager={this.props.screenProps.eventManager}
            tabLabel="home"
          />
          <Schedule
            ref={mySchedule => {
              this.mySchedule = mySchedule;
              eventManager.registerEventChangeListener(mySchedule);
            }}
            tabLabel="calendar"
            eventManager={this.props.screenProps.eventManager}
            navigation={this.props.navigation}
          />
          <Saved
            ref={mySaved => {
              this.mySaved = mySaved;
              eventManager.registerEventChangeListener(mySaved);
            }}
            tabLabel="heart"
            eventManager={this.props.screenProps.eventManager}
          />
          <Mentors tabLabel="people" />
          <Profile tabLabel="user" navigation={navigate} />
        </ScrollableTabView>
      </SafeAreaView>
    );
  }

  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    const eventManager = this.props.screenProps.eventManager;
  }

  componentWillUnmount() {
    const eventManager = this.props.screenProps.eventManager;
    eventManager.removeEventChangeListener(this.myHome);
    eventManager.removeEventChangeListener(this.mySchedule);
    eventManager.removeEventChangeListener(this.mySaved);

    eventManager.removeUpdatesListener(this.myHome);
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    //BackHandler.exitApp();
    return true;
  }

  configureNotificationSettings() {
    //create notifications channel
    const channel = new firebase.notifications.Android.Channel(
      channelId,
      channelName,
      firebase.notifications.Android.Importance.Max
    ).setDescription(
      "Bitcamp notification channel for delivering important announcements"
    );

    firebase.notifications().android.createChannel(channel);

    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          console.log("Permission enabled");
        } else {
          try {
            firebase.messaging().requestPermission();
          } catch (error) {
            console.log("Error authenticating", error);
          }
        }
      });

    firebase
      .messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          console.log("fcm token: ", fcmToken);
          // store FCMToken for use with mentorship notifications
          AsyncStorage.setItem("FCMToken", fcmToken);
        } else {
          console.log("no token");
        }
      });

    firebase.messaging().subscribeToTopic("announcements");

    this.notificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed((notification: Notification) => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        console.log("notification displayed", notification);
      });

    this.notificationListener = firebase
      .notifications()
      .onNotification((notification: Notification) => {
        console.log("notification received", notification);
        notification.android.setChannelId(channelId);
        firebase.notifications().displayNotification(notification);
      });
  }
}
