import SortView from '../view/sort-view.js';
import { render } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { filterByFuture, filterByPast, filterByPresent, generateFilter } from '../utils/filter.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import {FilterType, SortType, UpdateType, UserAction} from '../const.js';
import { sortPointsByDay, sortPointsByPrice, sortPointsByTime } from '../utils/sort.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #filters = {};
  #sortComponent = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #currentFilterType = FilterType.EVERYTHING;

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderFilters();
    if (this.#pointsModel.points.length === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#renderPointList();
  }


  get points() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortPointsByTime);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPointsByPrice);
      case SortType.DAY:
        return [...this.#pointsModel.points].sort(sortPointsByDay);
      default:
        return [...this.#pointsModel.points].sort(sortPointsByDay);
    }
  }

  #renderPointList() {
    const boardDestinations = this.#pointsModel.destinations;
    const boardOffers = this.#pointsModel.offers;
    const points = this.points;

    for (let i = 0; i < points.length; i++) {
      this.#renderPoint(points[i], boardDestinations, boardOffers);
    }
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoint(point, boardDestinations, boardOffers) {
    const pointPresenter = new PointPresenter(
      this.#boardContainer,
      this.#handleViewAction,
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

  #filterPoints(filterType) {
    switch (filterType) {
      case FilterType.FUTURE:
        [...this.#pointsModel.points] = filterByFuture(this.#pointsModel.points);
        break;
      case FilterType.PAST:
        [...this.#pointsModel.points] = filterByPast(this.#pointsModel.points);
        break;
      case FilterType.PRESENT:
        [...this.#pointsModel.points] = filterByPresent(this.#pointsModel.points);
        break;
      case FilterType.EVERYTHING:
        [...this.#pointsModel.points] = this.#pointsModel.points;
        break;
      default:
        [...this.#pointsModel.points] = this.#pointsModel.points;
    }
    this.#currentFilterType = filterType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
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

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updateTask(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deleteTask(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  };
}
