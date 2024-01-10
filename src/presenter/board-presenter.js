import SortView from '../view/sort-view.js';
import { render } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { filterByFuture, filterByPast, filterByPresent, generateFilter } from '../utils/filter.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/utils.js';
import {FilterType, SortType} from '../const.js';
import { sortPointsByDay, sortPointsByPrice, sortPointsByTime } from '../utils/sort.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #boardPoints = null;
  #filters = {};
  #sortComponent = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #currentFilterType = FilterType.EVERYTHING;
  #sourcedBoardPoints = [];

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points.sort(sortPointsByDay)];
    this.#sourcedBoardPoints = [...this.#pointsModel.points];

    this.#renderFilters();
    if (this.#pointsModel.points.length === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#renderPointList();
  }

  #renderPointList() {
    const boardDestinations = this.#pointsModel.getDestinations();
    const boardOffers = this.#pointsModel.getOffers();

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i], boardDestinations, boardOffers);
    }
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoint(point, boardDestinations, boardOffers) {
    const pointPresenter = new PointPresenter(
      this.#boardContainer,
      this.#handlePointChange,
      point,
      boardDestinations,
      boardOffers,
      this.#handleModeChange
    );
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderNoPoints() {
    render(new NoPointView, this.#boardContainer);
  }

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderFilters() {
    this.#filters = generateFilter(this.#pointsModel.points);
    render(new FilterView({filters: this.#filters, onFilterTypeChange: this.#handleFilterTypeChange}), document.querySelector('.trip-controls__filters'));
  }

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this.#boardPoints.sort(sortPointsByTime);
        break;
      case SortType.PRICE:
        this.#boardPoints.sort(sortPointsByPrice);
        break;
      case SortType.DAY:
        this.#boardPoints.sort(sortPointsByDay);
        break;
      default:
        this.#boardPoints.sort(sortPointsByDay);
    }
    this.#currentSortType = sortType;
  }

  #filterPoints(filterType) {
    switch (filterType) {
      case FilterType.FUTURE:
        this.#boardPoints = filterByFuture(this.#sourcedBoardPoints);
        break;
      case FilterType.PAST:
        this.#boardPoints = filterByPast(this.#sourcedBoardPoints);
        break;
      case FilterType.PRESENT:
        this.#boardPoints = filterByPresent(this.#sourcedBoardPoints);
        break;
      case FilterType.EVERYTHING:
        this.#boardPoints = this.#sourcedBoardPoints;
        break;
      default:
        this.#boardPoints = this.#sourcedBoardPoints;
    }
    this.#currentFilterType = filterType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderPointList();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#currentFilterType === filterType) {
      return;
    }

    this.#filterPoints(filterType);
    this.#clearPointsList();
    this.#renderPointList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#boardContainer);
  }

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };
}
