import dayjs from 'dayjs';
import {FilterType} from '../const.js';

const checkIsPointBefore = (date) => dayjs(date).isBefore(dayjs(), 'D');
const checkIsPointSame = (point) => dayjs().isBetween(dayjs(point.dateTo), dayjs(point.dateFrom), 'D');
const checkIsPointAfter = (date) => dayjs(date).isAfter(dayjs(), 'D');

const filtersGenerateInfo = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => checkIsPointAfter(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => checkIsPointSame(point)),
  [FilterType.PAST]: (points) => points.filter((point) => checkIsPointBefore(point.dateTo)),
};

function generateFilter(points) {
  return Object.entries(filtersGenerateInfo).map(
    ([filterType, filterPoints]) => ({
      type: filterType,
      count: filterPoints(points).length,
    }),
  );
}

function filterByFuture(points) {
  return points.filter((point) => dayjs().isBefore(dayjs(point.dateFrom)));
}

function filterByPast(points) {
  return points.filter((point) => dayjs().isAfter(dayjs(point.dateTo)));
}

function filterByPresent(points) {
  return points.filter((point) => dayjs().isBetween(dayjs(point.dateTo), dayjs(point.dateFrom)));
}

export {
  filtersGenerateInfo,
  generateFilter,
  filterByFuture,
  filterByPast,
  filterByPresent
};
