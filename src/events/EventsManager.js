// Use this class to interact with all of the events, never modify the state directly

import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import moment from 'moment';
import _ from 'lodash';

import EventDay from './EventDay';
import EventGroup from './EventGroup';
import Event from './Event';

import { normalizeTimeLabel, createEventGroup, createEventDay } from '../actions/util.js';
import scheduleData from '../../assets/schedule.json';

const APP_ID = '@com.technica.technica18:';
const EVENT_FAVORITED_STORE = APP_ID + 'EVENT_FAVORITED_STORE';
const SAVED_COUNT_STORE = APP_ID + 'SAVED_COUNT_STORE';
const EVENT_ID_PREFIX = APP_ID + 'eventNotification-';
const SCHEDULE_STORAGE_KEY = APP_ID + 'schedule';

const notificationBufferMins = 15;

const channelId = 'technica-push-notifications';

export default class EventsManager {
  constructor() {
    console.log('Initializing event manager');

    rawData = scheduleData.Schedule;
    this.eventDays = [];

    this.heartListeners = new Set();
    this.eventListeners = new Set();

    for (let i in rawData) {
      this.eventDays.push(createEventDay(rawData[i]));
    }

    this.combinedEvents = _.flatten(
      _.flatten(
        _.map(this.eventDays, eventDay =>
          _.map(eventDay.eventGroups, eventGroup => eventGroup.events)
        )
      )
    );

    this.eventIDToEventMap = {};

    this.combinedEvents.forEach(event => {
      this.eventIDToEventMap[event.eventID] = event;
    });

    // console.log('Combined events', this.combinedEvents);

    this.favoriteState = {};
    AsyncStorage.getItem(EVENT_FAVORITED_STORE, (err, result) => {
      if (result === null) {
        this.favoriteState = {};
      } else {
        this.favoriteState = JSON.parse(result);
      }
      this.updateHearts();

      //loads the copy of the schedule on the users phone
      AsyncStorage.getItem(SCHEDULE_STORAGE_KEY, (err, result) => {
          if(result != null){
            this.processNewEvents(JSON.parse(result), false);
          }

          //after we load the local schedule we will finally add the database query listener for schedule
          firebase.database().ref('/Schedule')
            .on('value', async (snapshot) => {
              let data = snapshot.val();
              console.log("Schedule object from firebase: ", data);

              //store new schedule on phone
              AsyncStorage.setItem(SCHEDULE_STORAGE_KEY, JSON.stringify(data), function(error){
                if (error){
                  console.log(error);
                }
              });

              this.processNewEvents(data, true);
            })
      });
    });

    this.savedCounts = {};
    AsyncStorage.getItem(SAVED_COUNT_STORE, (err, result) => {
      if (result === null) {
        for (let i in this.combinedEvents) {
          this.savedCounts[this.combinedEvents[i].eventID] = Math.floor(
            Math.random() * 1000
          );
        }
      } else {
        this.savedCounts = result;
      }

      // console.log('savedCounts', this.savedCounts);
      this.updateHearts();
    });

    this.getTopEvents.bind(this);
    this.getBeginnerEventsArray.bind(this);
  }

  processNewEvents(rawData, rescheduleNotifications) {
    newEventDays = [];

    //repeat process of scanning through events
    for (let i in rawData) {
      newEventDays.push(createEventDay(rawData[i]));
    }

    newCombinedEvents = _.flatten(
      _.flatten(
        _.map(newEventDays, eventDay =>
          _.map(eventDay.eventGroups, eventGroup => eventGroup.events)
        )
      )
    );

    let changed = false;
    newCombinedEvents.forEach(newEvent => {
      curEventObj = this.eventIDToEventMap[newEvent.eventID];

      if(!_.isEqual(curEventObj, newEvent)) {

        console.log("old", curEventObj);
        console.log("new", newEvent);
        // if the start time has changed we need to create a new notification and delete the original one
        if(newEvent.startTime != curEventObj.startTime &&
           this.isFavorited[newEvent.eventID] &&
         rescheduleNotifications) {
          this.deleteNotification(newEvent);
          this.createNotification(newEvent);
        }
        changed = true;

        //update Event object with new properties
        curEventObj.title = newEvent.title;
        curEventObj.description = newEvent.description;
        curEventObj.startTime = newEvent.startTime;
        curEventObj.endTime = newEvent.endTime;
        curEventObj.beginnerFriendly = newEvent.beginnerFriendly;
        curEventObj.location = newEvent.location;
        curEventObj.img = newEvent.img;
      } else if(newEvent.eventID == "100001") {
        console.log("same", curEventObj);
        console.log("and", newEvent);
      }
    })

    if(changed) {
      this.eventDays = newEventDays;
      this.updateEventComponents()
    }
  }

  getEventDays() {
    return this.eventDays;
  }

  getTopEvents(num) {
    topSorted = _.sortBy(
      this.combinedEvents,
      event => -this.savedCounts[event.eventID]
    );

    return topSorted.slice(0, num);
  }

  getBeginnerEventsArray() {
    return _.filter(this.combinedEvents, event => event.beginnerFriendly);
  }

  getSavedEventsArray() {
    return _.filter(
      this.combinedEvents,
      event => this.favoriteState[event.eventID]
    );
  }

  isFavorited(key) {
    return this.favoriteState[key];
  }

  //key of event
  // time in minutes to warn before event
  favoriteEvent(eventID) {
    this.favoriteState[eventID] = true;
    this.savedCounts[eventID]+= 1;
    updateObj = {};
    updateObj[eventID] = true;
    AsyncStorage.mergeItem(EVENT_FAVORITED_STORE, JSON.stringify(updateObj));

    event = this.eventIDToEventMap[eventID];
    this.createNotification(event);

    this.updateHearts();
  }

  unfavoriteEvent(eventID) {
    this.favoriteState[eventID] = false;
    this.savedCounts[eventID]-= 1;
    updateObj = {};
    updateObj[eventID] = false;
    AsyncStorage.mergeItem(EVENT_FAVORITED_STORE, JSON.stringify(updateObj));

    event = this.eventIDToEventMap[eventID];
    this.deleteNotification(event);

    this.updateHearts();
  }

  createNotification(event) {
    if(event.hasPassed) {
      return;
    }

    let notification = new firebase.notifications.Notification()
      .setNotificationId(EVENT_ID_PREFIX + event.eventID)
      .setTitle(event.title)
      .setBody(notificationBufferMins + ' minutes until event starts.');

    notification.android
      .setChannelId(channelId)
      .android.setSmallIcon('ic_launcher');

    firebase.notifications().scheduleNotification(notification, {
      fireDate: moment(event.startTime)
        .subtract(notificationBufferMins, 'minutes')
        .valueOf()
    });
  }

  deleteNotification(event) {
    firebase
      .notifications()
      .cancelNotification(EVENT_ID_PREFIX + event.eventID.toString());
  }

  getSavedCount(key) {
    return this.savedCounts[key];
  }

  registerHeartListener(component) {
    this.heartListeners.add(component);
  }

  removeHeartListener(component) {
    this.heartListeners.delete(component);
  }

  updateHearts() {
    this.heartListeners.forEach((component, comp, set) => {
      if (component != null) {
        component.forceUpdate();
      }
    });
  }

  registerEventChangeListener(component) {
    this.eventListeners.add(component);
  }

  removeEventChangeListener(component) {
    this.eventListeners.delete(component);
  }

  updateEventComponents() {
    this.eventListeners.forEach((component, comp, set) => {
      if (component != null) {
        component.forceUpdate();
      }
    });
  }
}
