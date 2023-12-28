import SortView from '../view/sort-view.js';
import { render } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { generateFilter } from '../mock/filter.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #boardPoints = null;
  #filters = {};
  #pointsPresenter = new Map();

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    const boardDestinations = this.#pointsModel.getDestinations();
    const boardOffers = this.#pointsModel.getOffers();

    this.#boardPoints = [...this.#pointsModel.getPoints()];

    this.#renderFilters();
    if (this.#pointsModel.points.length === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i], boardDestinations, boardOffers);
    }
  }

  #renderPoint(point, boardDestinations, boardOffers) {
    const pointPresenter = new PointPresenter(this.#boardContainer);
    pointPresenter.init(point, boardDestinations, boardOffers);
    this.#pointsPresenter.set(point.id, pointPresenter);
  }

  #renderNoPoints() {
    render(new NoPointView, this.#boardContainer);
  }

  #clearPointsList() {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
  }

  #renderFilters() {
    this.#filters = generateFilter(this.#pointsModel.points);
    render(new FilterView(this.#filters), document.querySelector('.trip-controls__filters'));
  }

  #renderSort() {
    render(new SortView(), this.#boardContainer);
  }
}
