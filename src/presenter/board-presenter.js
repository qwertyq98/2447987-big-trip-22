import SortView from '../view/sort-view.js';
import { render } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { generateFilter } from '../mock/filter.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #boardPoints = [];
  #filters = {};

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#filters = generateFilter(this.#pointsModel.points);
  }

  init() {
    const boardDestinations = this.#pointsModel.getDestinations();
    const boardOffers = this.#pointsModel.getOffers();

    this.#boardPoints = [...this.#pointsModel.getPoints()];

    render(new FilterView(this.#filters), document.querySelector('.trip-controls__filters'));
    if (this.#pointsModel.points.length === 0) {
      render(new NoPointView, this.#boardContainer);
      return;
    }
    render(new SortView(), this.#boardContainer);

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i], boardDestinations, boardOffers);
    }
  }

  #renderPoint(point, boardDestinations, boardOffers) {
    const pointPresenter = new PointPresenter(this.#boardContainer);
    pointPresenter.init(point, boardDestinations, boardOffers);
  }
}
