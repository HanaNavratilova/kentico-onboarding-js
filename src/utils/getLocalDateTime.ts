import * as moment from 'moment';
import { timeFormat } from '../constants/timeFormat';

export const getLocalDateTime = (time: Time): Time => {
  const stillUtc = moment.utc(time).toDate();
  const local = moment(stillUtc).local().format(timeFormat);
  return local;
};
