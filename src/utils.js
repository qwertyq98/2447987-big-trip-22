import dayjs from 'dayjs';

export const getRandomArrayElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const transformData = (date, format) => date ? dayjs(date).format(format) : '';
