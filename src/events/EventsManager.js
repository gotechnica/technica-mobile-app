// Use this class to interact with all of the events, never modify the state directly

import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import moment from 'moment';
import _ from 'lodash';

import EventDay from './EventDay';
import EventGroup from './EventGroup';
import Event from './Event';

import { normalizeTimeLabel } from '../actions/util.js';
import scheduleData from '../../assets/schedule.json';

const EVENT_FAVORITED_STORE = 'EVENT_FAVORITED_STORE';
const SAVED_COUNT_STORE = 'SAVED_COUNT_STORE';
const EVENT_ID_PREFIX = 'eventNotification-';

const channelId = 'technica-push-notifications';

export default class EventsManager {
  constructor() {
    console.log('Initializing event manager');
    // creates an EventGroup object from a collection of event json entries
    // which have already been grouped
    function createEventGroup(eventGroupLabel, rawEventArray) {
      let eventArray = [];

      for (let i in rawEventArray) {
        rawEvent = rawEventArray[i];
        eventArray.push(
          new Event(
            rawEvent.eventID,
            rawEvent.title,
            rawEvent.description,
            rawEvent.startTime,
            rawEvent.endTime,
            rawEvent.beginnerFriendly,
            rawEvent.location,
            rawEvent.img
          )
        );
      }

      return new EventGroup(eventGroupLabel, eventArray);
    }

    // creates an EventDay object from an array of event json entries
    function createEventDay(rawEventDay) {
      dayLabel = rawEventDay[0];
      sortedEvents = rawEventDay[1].sort((event1, event2) => {
        start1 = moment(event1.startTime);
        start2 = moment(event2.startTime);

        end1 = moment(event1.endTime);
        end2 = moment(event2.endTime);

        if (start1 - start2 == 0) {
          return end1 - end2;
        }

        return start1 - start2;
      });

      groupedData = _.groupBy(sortedEvents, event => {
        return normalizeTimeLabel(event.startTime);
      });

      eventGroupLabels = Object.keys(groupedData);

      eventGroupObjs = [];
      for (let i = 0; i < eventGroupLabels.length; i++) {
        eventGroupObjs.push(
          createEventGroup(
            eventGroupLabels[i],
            groupedData[eventGroupLabels[i]]
          )
        );
      }

      return new EventDay(dayLabel, eventGroupObjs);
    }

    rawData = scheduleData.Schedule;
    this.eventDays = [];

    this.componentListeners = new Set();

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

    this.keyToEventMap = {};

    this.combinedEvents.forEach(event => {
      this.keyToEventMap[event.eventID] = event;
    });

    console.log('Combined events', this.combinedEvents);

    this.favoriteState = {};
    AsyncStorage.getItem(EVENT_FAVORITED_STORE, (err, result) => {
      if (result === null) {
        this.favoriteState = {};
      } else {
        this.favoriteState = JSON.parse(result);
      }
      console.log('favorites', this.favoriteState);
    });

    this.savedCounts = {};
    AsyncStorage.getItem(SAVED_COUNT_STORE, (err, result) => {
      this.savedCounts = result;
      if (result === null) {
        this.savedCounts = {};

        for (let i in this.combinedEvents) {
          this.savedCounts[this.combinedEvents[i].eventID] = Math.floor(
            Math.random() * 1000
          );
        }
      } else {
        this.savedCounts = result;
      }

      console.log('savedCounts', this.savedCounts);
      this.updateComponents();
    });

    this.getTopEvents.bind(this);
    this.getBeginnerEventsArray.bind(this);
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
  favoriteEvent(key, timeMin) {
    this.favoriteState[key] = true;
    updateObj = {};
    updateObj[key] = true;
    AsyncStorage.mergeItem(EVENT_FAVORITED_STORE, JSON.stringify(updateObj));

    event = this.keyToEventMap[key];
    let notification = new firebase.notifications.Notification()
      .setNotificationId(EVENT_ID_PREFIX + key.toString())
      .setTitle(event.title)
      .setBody(timeMin + ' minutes until event starts.');

    notification.android
      .setChannelId(channelId)
      .android.setSmallIcon('ic_launcher');

    firebase.notifications().scheduleNotification(notification, {
      fireDate: moment(event.startTime)
        .subtract(timeMin, 'minutes')
        .valueOf()
    });

    this.updateComponents();
  }

  unfavoriteEvent(key) {
    this.favoriteState[key] = false;
    updateObj = {};
    updateObj[key] = false;
    AsyncStorage.mergeItem(EVENT_FAVORITED_STORE, JSON.stringify(updateObj));

    event = this.keyToEventMap[key];
    firebase
      .notifications()
      .cancelNotification(EVENT_ID_PREFIX + event.eventID.toString());

    this.updateComponents();
  }

  getSavedCount(key) {
    return this.savedCounts[key];
  }

  registerComponentListener(component) {
    this.componentListeners.add(component);
  }

  removeComponentListener(component) {
    this.componentListeners.delete(component);
  }

  updateComponents() {
    this.componentListeners.forEach((component, comp, set) => {
      if (component !== null) {
        component.forceUpdate();
      }
    });
  }
}
