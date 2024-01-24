import dayjs from 'dayjs';
import { DATE_FORMAT, TIME_FORMAT } from '../const';

const transformData = (date, format) => date ? dayjs(date).format(format) : '';
const transformToDateFromFormat = (dateFrom) => transformData(dateFrom, DATE_FORMAT);
const transformToTimeFromFormat = (dateFrom) => transformData(dateFrom, TIME_FORMAT);
const transformToTimeToFormat = (date) => transformData(date, TIME_FORMAT);
const calculateDurationOfStay = (dateTo, dateFrom) => dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)));
const ucFirst = (str) => str[0]?.toUpperCase() + str?.slice(1);
const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
const resetIfInvalid = (input) => {
  if (input.value === '') {
    return;
  }
  const options = input.list.options;
  for (let i = 0; i < options.length; i++) {
    if (input.value === options[i].value) {
      return;
    }
  }
  input.value = '';
};
const checkFormValidity = (input, form) => {
  resetIfInvalid(input);
  return form.checkValidity();
};

export {
  transformData,
  transformToDateFromFormat,
  transformToTimeFromFormat,
  transformToTimeToFormat,
  calculateDurationOfStay,
  ucFirst,
  isDatesEqual,
  checkFormValidity,
};
