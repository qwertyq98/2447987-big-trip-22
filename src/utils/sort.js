import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { calculateDurationOfStay } from './utils';
dayjs.extend(isBetween);

function sortPointsByDay(firstPoint, secondPoint) {
  return dayjs(firstPoint.date_from) - dayjs(secondPoint.date_from);
}

function sortPointsByTime(firstPoint, secondPoint) {
  return calculateDurationOfStay(secondPoint.date_to, secondPoint.date_from).$ms - calculateDurationOfStay(firstPoint.date_to, firstPoint.date_from).$ms;
}

function sortPointsByPrice(firstPoint, secondPoint) {
  return Number(secondPoint.basePrice) - Number(firstPoint.basePrice);
}

export {
  sortPointsByTime,
  sortPointsByPrice,
  sortPointsByDay,
};
