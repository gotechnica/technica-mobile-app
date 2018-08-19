import { normalizeTimeLabel } from '../actions/util.js';

export default class Event {
  constructor(
    key,
    title,
    description,
    startTime,
    endTime,
    beginnerFriendly,
    location,
    img
  ) {
    this.key = key;
    this.title = title;
    this.description = description;
    this.startTime = startTime;
    this.endTime = endTime;
    this.beginnerFriendly = beginnerFriendly;
    this.location = location;
  }

  get startTimeFormatted() {
    return normalizeTimeLabel(this.startTime);
  }

  get endTimeFormatted() {
    return normalizeTimeLabel(this.endTime);
  }
}
