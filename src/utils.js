import dayjs from 'dayjs';
import { FilterType, SortType } from './const.js';

const DATE_FORMAT = 'DD/MM/YY HH:mm';
const FLATPICKR_DATE_FORMAT = 'd/m/y H:i';
const TIME_FORMAT = 'HH:mm';
const DAY_FORMAT = 'MMM D';

const getRandomItem = (items) =>
  items[Math.floor(Math.random() * items.length)];

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateId = () => crypto.randomUUID();

function humanizeDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

function humanizeTime(date) {
  return date ? dayjs(date).format(TIME_FORMAT) : '';
}

function humanizeDay(date) {
  return date ? dayjs(date).format(DAY_FORMAT).toUpperCase() : '';
}

function formatDurationUnit(value) {
  return String(value).padStart(2, '0');
}

function getDuration(startDate, endDate) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  const totalMinutes = end.diff(start, 'minute');
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return `${days}D ${formatDurationUnit(hours)}H ${formatDurationUnit(minutes)}M`;
  }

  if (hours > 0) {
    return `${formatDurationUnit(hours)}H ${formatDurationUnit(minutes)}M`;
  }

  return `${minutes}M`;
}

const isFuture = (point) => new Date(point.dateFrom) > new Date();
const isPast = (point) => new Date(point.dateTo) < new Date();
const isPresent = (point) =>
  new Date(point.dateFrom) <= new Date() &&
  new Date(point.dateTo) >= new Date();

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter(isFuture),
  [FilterType.PRESENT]: (points) => points.filter(isPresent),
  [FilterType.PAST]: (points) => points.filter(isPast),
};

const sortByDay = (pointA, pointB) =>
  dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortByPrice = (pointA, pointB) =>
  pointB.basePrice - pointA.basePrice;

const sortByDuration = (pointA, pointB) => {
  const durationA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const durationB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return durationB - durationA;
};

const sort = {
  [SortType.DAY]: (points) => [...points].sort(sortByDay),
  [SortType.TIME]: (points) => [...points].sort(sortByDuration),
  [SortType.PRICE]: (points) => [...points].sort(sortByPrice),
};

export {
  getRandomItem,
  getRandomInt,
  generateId,
  humanizeDate,
  humanizeTime,
  humanizeDay,
  getDuration,
  filter,
  sort,
  FLATPICKR_DATE_FORMAT,
};
