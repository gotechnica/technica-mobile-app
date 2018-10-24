import { hasTimePassed, normalizeTimeLabel } from '../actions/util.js';

export default class Event {
  constructor(
    eventID,
    title,
    description,
    startTime,
    endTime,
    beginnerFriendly,
    location,
    img
  ) {
    this.eventID = eventID;
    this.title = title;
    this.description = description;
    this.startTime = startTime;
    this.endTime = endTime;
    this.beginnerFriendly = beginnerFriendly;
    this.location = location;
    this.img = img;
  }


  get startTimeFormatted() {
    return normalizeTimeLabel(this.startTime)
  }

  get endTimeFormatted() {
    return normalizeTimeLabel(this.endTime);
  }

  get hasPassed() {
    return hasTimePassed(this.endTime);
  }

  get hasBegun() {
    return hasTimePassed(this.startTime);
  }
}
