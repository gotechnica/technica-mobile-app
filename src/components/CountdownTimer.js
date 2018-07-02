import React, { Component } from 'react';
import moment from 'moment';
import { SubHeading } from './Base';

 // when hacking begins
const START_TIME = moment("2018-11-08 10:00");
// when hacking ends
const END_TIME = moment("2018-11-09 12:00");

export default class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment(),
    };
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        time: moment(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const startTime = START_TIME;
    const endTime = END_TIME;

    let remain;  // the time remaining until the next 'event' (either hacking begins or hacking ends)

    let days;
    let hours;
    let minutes;
    let seconds;

    if (this.state.time < startTime) {
      return (
        <SubHeading>Coming Soon!</SubHeading>
      )
    // If hacking is over
    } else if (this.state.time > endTime) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;

    } else {
      // If hacking hasn't begun
      // Calculate time until hacking begins
      if (this.state.time <= startTime) {
        remain = moment.duration(moment(startTime).diff(moment(this.state.time)));
      // If hacking has begun
      // Calculate time until hacking finishes
      } else if (this.state.time > startTime && this.state.time < endTime) {
        remain = moment.duration(moment(endTime).diff(moment(this.state.time)));
      }
      days    = remain.days();
      hours   = remain.hours();
      minutes = remain.minutes();
      seconds = remain.seconds();
    }

    let daysText = (days < 10) ? `0${days}` : `${days}`;
    let hoursText = (hours < 10) ? `0${hours}` : `${hours}`
    let minutesText = (minutes < 10) ? `0${minutes}` : `${minutes}`;
    let secondsText = (seconds < 10) ? `0${seconds}` : `${seconds}`;

    return (
      <SubHeading>
        {`${daysText}d ${hoursText}h ${minutesText}m ${secondsText}s left to hack`}
      </SubHeading>
    );
  }
}
