import dayjs from 'dayjs';
import {FilterType} from '../../const.js';

const checkIsPointBefore = (date) => dayjs(date).isBefore(dayjs(), 'D');
const checkIsPointSame = (date) => dayjs(date).isSame(dayjs(), 'D');
const checkIsPointAfter = (date) => dayjs(date).isAfter(dayjs(), 'D');

const filtersGenerateInfo = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points?.filter((point) => checkIsPointAfter(point.date_from)),
  [FilterType.PRESENT]: (points) => points?.filter((point) => checkIsPointSame(point.date_from)),
  [FilterType.PAST]: (points) => points?.filter((point) => checkIsPointBefore(point.date_from)),
};

export {filtersGenerateInfo};
