import moment from 'moment';

export function normalizeTimeLabel(t) {
  return moment(t).format("h:mma")
}

export function hasTimePassed(t) {
  const now = moment();
  return (now.diff(moment(t))) > 0;
}
