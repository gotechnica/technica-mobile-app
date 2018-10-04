import React, { Component } from 'react';
import { DefaultTheme, BottomNavigation } from 'react-native-paper';
import Home from './Home';
import Mentors from './Mentors';
import Profile from './Profile';
import Saved from './Saved';
import Schedule from './Schedule';
import Login from './Login';
import CustomTabBar from '../components/CustomTabBar';
import { H5 } from '../components/Text';
import { colors } from '../components/Colors';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { PushNotificationIOS } from 'react-native';
import Analytics from '@aws-amplify/analytics';
import aws_exports from '../../aws-exports';

import firebase from 'react-native-firebase';

const channelId = 'technica-push-notifications';
const channelName = 'Technica Announcements';

export default class AppContainer extends Component<Props> {
	static navigationOptions = {
		header: null,
	};
  constructor(props) {
    super(props);
  }

  render() {
    Analytics.configure(aws_exports);

    //create notifications channel
    const channel = new firebase.notifications.Android.Channel(
      channelId,
      channelName,
      firebase.notifications.Android.Importance.Max
    ).setDescription(
      'Technica notification channel for delivering important announcements'
    );

    firebase.notifications().android.createChannel(channel);

    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          console.log('Permission enabled');
        } else {
          try {
            firebase.messaging().requestPermission();
          } catch (error) {
            console.log('Error authenticating', error);
          }
        }
      });

    firebase
      .messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          console.log('fcm token: ', fcmToken);
        } else {
          console.log('no token');
        }
      });

    this.notificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed((notification: Notification) => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        console.log('notification displayed', notification);
      });

    this.notificationListener = firebase
      .notifications()
      .onNotification((notification: Notification) => {
        console.log('notification received', notification);
        notification.android.setChannelId(channelId);
        firebase.notifications().displayNotification(notification);
      });

    const notification = new firebase.notifications.Notification()
      .setNotificationId('notificationId')
      .setTitle('Hello world')
      .setBody('I love local notifications');

    notification.android
      .setChannelId(channelId)
      .android.setSmallIcon('ic_launcher');
    firebase.notifications().displayNotification(notification);

    return (
      <ScrollableTabView
        tabBarPosition="bottom"
        locked
        style={{ backgroundColor: colors.black }}
        renderTabBar={() => <CustomTabBar />}
      >
        <Home
          eventManager={this.props.screenProps.eventManager}
          tabLabel="home"
        />
        <Schedule
          tabLabel="calendar"
          eventManager={this.props.screenProps.eventManager}
        />
        <Saved
          tabLabel="heart"
          eventManager={this.props.screenProps.eventManager}
        />
        <Mentors tabLabel="people" />
        <Profile tabLabel="user" />
      </ScrollableTabView>
    );
  }
}
