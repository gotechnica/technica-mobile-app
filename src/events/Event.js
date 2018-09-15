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

    // The following are not from database schema
    this.startTimeFormatted = normalizeTimeLabel(this.startTime);
    this.endTimeFormatted = normalizeTimeLabel(this.endTime);
    this.hasPassed = hasTimePassed(this.endTime);
  }
}
