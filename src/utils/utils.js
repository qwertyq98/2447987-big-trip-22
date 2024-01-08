import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import { DATE_FORMAT, TIME_FORMAT } from '../const';

export const transformData = (date, format) => date ? dayjs(date).format(format) : '';
export const transformToDateFromFormat = (dateFrom) => transformData(dateFrom, DATE_FORMAT);
export const transformToTimeFromFormat = (dateFrom) => transformData(dateFrom, TIME_FORMAT);
export const transformToTimeToFormat = (date) => transformData(date, TIME_FORMAT);
export const calculateDurationOfStay = (dateTo, dateFrom) => dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)));

export const getRandomArrayElement = (arr) => {
  const item = arr[Math.floor(Math.random() * arr.length)];
  return {...item, id: nanoid()};
};
export const ucFirst = (str) => str[0]?.toUpperCase() + str?.slice(1);
export const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);
