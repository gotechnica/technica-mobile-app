import moment from 'moment';

export function normalizeTimeLabel(t) {
  return moment(t).format("h:mma")
}
