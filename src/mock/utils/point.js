import dayjs from 'dayjs';
import { DATE_FORMAT, TIME_FORMAT } from '../../const';
import { transformData } from '../../utils';

const transformToDateFromFormat = (dateFrom) => transformData(dateFrom, DATE_FORMAT);
const transformToTimeFromFormat = (dateFrom) => transformData(dateFrom, TIME_FORMAT);
const transformToTimeToFormat = (date) => transformData(date, TIME_FORMAT);
const calculateDurationOfStay = (dateTo, dateFrom) => dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)));

function sortPointsByDay(firstPoint, secondPoint) {
  if (dayjs(firstPoint.date_from) > dayjs(secondPoint.date_from)) {
    return 1;
  }
  if (dayjs(firstPoint.date_from) < dayjs(secondPoint.date_from)) {
    return -1;
  }
  return 0;
}

function sortPointsByTime(firstPoint, secondPoint) {
  return calculateDurationOfStay(secondPoint.date_to, secondPoint.date_from).$ms - calculateDurationOfStay(firstPoint.date_to, firstPoint.date_from).$ms;
}


function sortPointsByPrice(firstPoint, secondPoint) {
  if (Number(firstPoint.base_price) < Number(secondPoint.base_price)) {
    return 1;
  }
  if (Number(firstPoint.base_price) > Number(secondPoint.base_price)) {
    return -1;
  }
  return 0;
}

export {
  sortPointsByTime,
  sortPointsByPrice,
  sortPointsByDay,
  transformToDateFromFormat,
  transformToTimeFromFormat,
  transformToTimeToFormat,
  calculateDurationOfStay,
};
