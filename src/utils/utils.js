import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import { DATE_FORMAT, TIME_FORMAT } from '../const';

const transformData = (date, format) => date ? dayjs(date).format(format) : '';
const transformToDateFromFormat = (dateFrom) => transformData(dateFrom, DATE_FORMAT);
const transformToTimeFromFormat = (dateFrom) => transformData(dateFrom, TIME_FORMAT);
const transformToTimeToFormat = (date) => transformData(date, TIME_FORMAT);
const calculateDurationOfStay = (dateTo, dateFrom) => dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)));
const getRandomArrayElement = (arr) => {
  const item = arr[Math.floor(Math.random() * arr.length)];
  return {...item, id: nanoid()};
};
const ucFirst = (str) => str[0]?.toUpperCase() + str?.slice(1);
const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export {
  transformData,
  transformToDateFromFormat,
  transformToTimeFromFormat,
  transformToTimeToFormat,
  calculateDurationOfStay,
  getRandomArrayElement,
  ucFirst,
  updateItem,
};
