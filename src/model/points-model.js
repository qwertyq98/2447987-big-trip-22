import { POINT_COUNT } from '../const.js';
import { getRandomPoint } from '../mock/point.js';

export default class PointModel {
  points = Array.from({length: POINT_COUNT}, getRandomPoint);

  getPoints() {
    return this.points;
  }
}
