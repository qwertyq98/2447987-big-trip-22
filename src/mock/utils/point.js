import dayjs from 'dayjs';
import { DATE_FORMAT, TIME_FORMAT } from '../../const';
import { transformData } from '../../utils';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

const transformToDateFromFormat = (dateFrom) => transformData(dateFrom, DATE_FORMAT);
const transformToTimeFromFormat = (dateFrom) => transformData(dateFrom, TIME_FORMAT);
const transformToTimeToFormat = (date) => transformData(date, TIME_FORMAT);
const calculateDurationOfStay = (dateTo, dateFrom) => dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)));

function sortPointsByDay(firstPoint, secondPoint) {
  return dayjs(firstPoint.date_from) - dayjs(secondPoint.date_from);
}

function sortPointsByTime(firstPoint, secondPoint) {
  return calculateDurationOfStay(secondPoint.date_to, secondPoint.date_from).$ms - calculateDurationOfStay(firstPoint.date_to, firstPoint.date_from).$ms;
}


function sortPointsByPrice(firstPoint, secondPoint) {
  return Number(secondPoint.base_price) - Number(firstPoint.base_price);
}

function filterByFuture(points) {
  return points.filter((point) => dayjs().isBefore(dayjs(point?.date_from)));
}

function filterByPast(points) {
  return points.filter((point) => dayjs().isAfter(dayjs(point?.date_to)));
}

function filterByPresent(points) {
  return points.filter((point) => dayjs().isBetween(dayjs(point?.date_to), dayjs(point?.date_from)));
}

export {
  sortPointsByTime,
  sortPointsByPrice,
  sortPointsByDay,
  transformToDateFromFormat,
  transformToTimeFromFormat,
  transformToTimeToFormat,
  calculateDurationOfStay,
  filterByFuture,
  filterByPast,
  filterByPresent,
};
