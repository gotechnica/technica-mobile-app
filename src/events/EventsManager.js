// Use this class to interact with all of the events, never modify the state directly

import { AsyncStorage } from 'react-native';
import moment from 'moment';
import _ from 'lodash';

import EventDay from './EventDay';
import EventGroup from './EventGroup';
import Event from './Event';

import { normalizeTimeLabel } from '../actions/util.js';
import scheduleData from '../../assets/schedule.json';

const EVENT_FAVORITED_STORE = 'EVENT_FAVORITED_STORE';
const SAVED_COUNT_STORE = 'SAVED_COUNT_STORE';

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
            rawEvent.key,
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

    this.favoriteState = {};
    AsyncStorage.getItem(EVENT_FAVORITED_STORE, (err, result) => {
      this.favoriteState = result;
      console.log('favorites', result);
    });

    this.savedCounts = {};
    AsyncStorage.getItem(SAVED_COUNT_STORE, (err, result) => {
      this.savedCounts = result;
      console.log('savedCounts', savedCounts);
    });

    for (let i in rawData) {
      this.eventDays.push(createEventDay(rawData[i]));
    }
  }

  getEventDays() {
    return this.eventDays;
  }

  getTopEvents(num) {
    return [];
  }

  isFavorited(key) {
    return this.favoriteState[key];
  }

  favoriteEvent(key) {
    updateObj = {};
    updateObj[key] = true;
    AsyncStorage.mergeItem(EVENT_FAVORITED_STORE, JSON.stringify(updateObj));

    //TODO schedule notification
  }

  unfavoriteEvent(key) {
    updateObj = {};
    updateObj[key] = false;
    AsyncStorage.mergeItem(EVENT_FAVORITED_STORE, JSON.stringify(updateObj));

    //TODO remove notification
  }

  getSavedCount(key) {
    return this.savedCounts[key];
  }
}
