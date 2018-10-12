import React, { Component } from 'react';
import moment from 'moment';
import { SubHeading } from './Base';

// when hacking begins
const START_TIME = moment("2018-11-10 12:00");
// when hacking ends
const END_TIME = moment("2018-11-11 12:00");

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

    let remain;

    let days;
    let hours;
    let minutes;
    let seconds;

    // If hacking hasn't begun
    if (this.state.time < startTime) {
      return (
        <SubHeading>November 10-11</SubHeading>
      );

    // If hacking is over
    } else if (this.state.time > endTime) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;

    // If hacking is currently happening
    } else {
      remain  = moment.duration(moment(endTime).diff(moment(this.state.time)));
      days    = remain.days();
      hours   = remain.hours();
      minutes = remain.minutes();
      seconds = remain.seconds();
    }

    let daysText = (days > 0) ? `${days}d ` : ``;
    let hoursText = `${hours}h `
    let minutesText = `${minutes}m `;
    let secondsText = `${seconds}s `;

    return (
      <SubHeading>
        {`${daysText}${hoursText}${minutesText}${secondsText}left to hack`}
      </SubHeading>
    );
  }
}
