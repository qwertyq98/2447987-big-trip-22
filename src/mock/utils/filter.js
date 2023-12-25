import dayjs from 'dayjs';
import {FILTERS} from '../../const.js';

const checkIsPointBefore = (date) => dayjs(date).isBefore(dayjs(), 'D');
const checkIsPointSame = (date) => dayjs(date).isSame(dayjs(), 'D');
const checkIsPointAfter = (date) => dayjs(date).isAfter(dayjs(), 'D');

const filtersGenerateInfo = {
  [FILTERS.EVERYTHING]: (points) => points,
  [FILTERS.FUTURE]: (points) => points.filter((point) => checkIsPointAfter(point.date_from)),
  [FILTERS.PRESENT]: (points) => points.filter((point) => checkIsPointSame(point.date_from)),
  [FILTERS.PAST]: (points) => points.filter((point) => checkIsPointBefore(point.date_from)),
};

export {filtersGenerateInfo};
