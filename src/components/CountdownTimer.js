import React, { Component } from 'react';
import moment from 'moment';
import { SubHeading } from './Base';

 // when hacking begins
const START_TIME = moment("2018-07-07 12:00");
// when hacking ends
const END_TIME = moment("2018-07-07 19:00");

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
        <SubHeading>Coming Soon!</SubHeading>
      );

    // If hacking is over
    } else if (this.state.time > endTime) {
      hours = 0;
      minutes = 0;
      seconds = 0;

    // If hacking is currently happening
    } else {
      remain = moment.duration(moment(endTime).diff(moment(this.state.time)));
      hours   = remain.hours();
      minutes = remain.minutes();
      seconds = remain.seconds();
    }

    let hoursText = (hours < 10) ? `0${hours}` : `${hours}`
    let minutesText = (minutes < 10) ? `0${minutes}` : `${minutes}`;
    let secondsText = (seconds < 10) ? `0${seconds}` : `${seconds}`;

    return (
      <SubHeading>
        {`${hoursText}h ${minutesText}m ${secondsText}s left to hack`}
      </SubHeading>
    );
  }
}
