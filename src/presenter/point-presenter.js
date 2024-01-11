import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';
import { render, replace, remove } from '../framework/render.js';
import { ModeType } from '../const.js';

export default class PointPresenter {
  #boardContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #handleFavotiteChange = null;
  #boardOffers = null;
  #boardDestinations = null;
  #point = null;
  #handleModeChange = null;
  #modeType = ModeType.VIEWING;

  constructor(boardContainer, onFavoriteChange, point, boardDestinations, boardOffers, onModeChange) {
    this.#boardContainer = boardContainer;
    this.#handleFavotiteChange = onFavoriteChange;
    this.#point = point;
    this.#boardDestinations = boardDestinations;
    this.#boardOffers = boardOffers;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      boardDestinations: this.#boardDestinations,
      boardOffers: this.#boardOffers,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#toggleFavoriteState,
    });

    this.#pointEditComponent = new EditFormView({
      point: {...this.#point},
      boardDestinations: this.#boardDestinations,
      boardOffers: this.#boardOffers,
      onFormSubmit: this.#handleFormSubmit,
      onCloseForm: this.#buttonCloseHandler,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#boardContainer);
      return;
    }

    if (this.#modeType === ModeType.VIEWING) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#modeType === ModeType.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#modeType !== ModeType.VIEWING) {
      this.#pointEditComponent.reset();
      this.#replaceFormToPoint();
    }
  }

  #buttonCloseHandler = () => {
    this.#pointEditComponent.reset();
    this.#replaceFormToPoint();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditComponent.reset();
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#modeType = ModeType.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#modeType = ModeType.VIEWING;
  }

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFormSubmit = (point) => {
    this.#handleFavotiteChange(point);
    this.#replaceFormToPoint();
  };

  #toggleFavoriteState = () => {
    this.#handleFavotiteChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
