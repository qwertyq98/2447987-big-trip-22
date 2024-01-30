import dayjs from 'dayjs';
import { DATE_FORMAT, TIME_FORMAT, VALID_DATA_LENGTH } from '../const';

const transformData = (date, format) => date ? dayjs(date).format(format) : '';
const transformToDateFromFormat = (dateFrom) => transformData(dateFrom, DATE_FORMAT);
const transformToTimeFromFormat = (dateFrom) => transformData(dateFrom, TIME_FORMAT);
const transformToTimeToFormat = (date) => transformData(date, TIME_FORMAT);
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
  transformToTimeFromFormat,
  transformToTimeToFormat,
  calculateDurationOfStay,
  ucFirst,
  isDatesEqual,
  formatDuratioToTwoCharacters,
};
