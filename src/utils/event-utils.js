import dayjs from 'dayjs';

const DATE_FORMAT = 'DD/MM/YY HH:mm';
const TIME_FORMAT = 'HH:mm';
const DAY_FORMAT = 'MMM D';

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
    return `${String(days).padStart(2, '0')}D ${String(hours % 24).padStart(2, '0')}H ${String(minutes % 60).padStart(2, '0')}M`;
  }

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}H ${String(minutes % 60).padStart(2, '0')}M`;
  }

  return `${minutes}M`;
}

export { humanizeDate, humanizeTime, humanizeDay, getDuration };
