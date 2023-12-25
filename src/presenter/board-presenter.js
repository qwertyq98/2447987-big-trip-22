import SortView from '../view/sort-view.js';
import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';
import { render, replace } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { generateFilter } from '../mock/filter.js';

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
    render(new SortView(), this.#boardContainer);

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i], boardDestinations, boardOffers);
    }
  }

  #renderPoint(point, boardDestinations, boardOffers) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const pointComponent = new PointView({
      point,
      boardDestinations,
      boardOffers,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const pointEditComponent = new EditFormView({
      point,
      boardDestinations,
      boardOffers,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#boardContainer);
  }
}
