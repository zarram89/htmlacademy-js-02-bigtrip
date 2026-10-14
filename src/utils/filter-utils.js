import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween.js';
import { FilterType } from '../const.js';

dayjs.extend(isBetween);

const now = dayjs();

const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => dayjs(event.dateFrom).isAfter(now)),
  [FilterType.PRESENT]: (events) => events.filter((event) => now.isBetween(event.dateFrom, event.dateTo, null, '[]')),
  [FilterType.PAST]: (events) => events.filter((event) => dayjs(event.dateTo).isBefore(now)),
};

export { filter };

