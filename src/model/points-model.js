import { POINT_COUNT } from '../const.js';
import { mockDestinations } from '../mock/destinations.js';
import { mockOffers } from '../mock/offers.js';
import { getRandomPoint } from '../mock/points.js';

export default class PointsModel {
  constructor() {
    this.points = [];
    this.destinations = [];
    this.offers = [];
  }

  initPoints() {
    this.points = Array.from({length: POINT_COUNT}, getRandomPoint);
    this.destinations = mockDestinations;
    this.offers = mockOffers;
  }

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}
