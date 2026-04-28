import dayjs from 'dayjs';

const DATE_FORMAT = 'DD/MM/YY HH:mm';
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

function getDuration(startDate, endDate) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  const minutes = end.diff(start, 'minute');
  const hours = end.diff(start, 'hour');
  const days = end.diff(start, 'day');

  if (days > 0) {
    return `${days}D ${hours % 24}H ${minutes % 60}M`;
  }

  if (hours > 0) {
    return `${hours}H ${minutes % 60}M`;
  }

  return `${minutes}M`;
}

export { getRandomItem, getRandomInt, generateId, humanizeDate, humanizeTime, humanizeDay, getDuration };
