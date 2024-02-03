import dayjs from 'dayjs';
import { DateFormat, VALID_DATA_LENGTH } from '../const';

const transformData = (date, format) => date ? dayjs(date).format(format) : '';
const transformToDateFromFormat = (dateFrom) => transformData(dateFrom, DateFormat.DATE);
const transformToTimeToFormat = (date) => transformData(date, DateFormat.TIME);
const transformToTimeToFormatReverse = (date) => transformData(date, DateFormat.REVERSE_DATE);
const calculateDurationOfStay = (dateTo, dateFrom) => dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)));
const ucFirst = (str) => str[0].toUpperCase() + str.slice(1);
const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
const formatDuratioToTwoCharacters = (durationElement) => {
  const isTwoCharacters = String(durationElement).length < VALID_DATA_LENGTH;
  if (isTwoCharacters) {
    return `0${durationElement}`;
  } else {
    return durationElement;
  }
};

export {
  transformData,
  transformToDateFromFormat,
  transformToTimeToFormat,
  calculateDurationOfStay,
  transformToTimeToFormatReverse,
  ucFirst,
  isDatesEqual,
  formatDuratioToTwoCharacters,
};
