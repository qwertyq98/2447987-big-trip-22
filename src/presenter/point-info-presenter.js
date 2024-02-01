import { UpdateType } from '../const.js';
import { replace, remove, render, RenderPosition } from '../framework/render.js';
import HeaderInfo from '../view/header-info.js';

export default class PointInfoPresenter {
  #pointInfoContainer;
  #pointsModel = null;
  #destinations = null;
  #pointInfoComponent = null;

  constructor({ infoContainer, pointsModel }) {
    this.#pointInfoContainer = infoContainer;
    this.#pointsModel = pointsModel;
    this.#pointsModel.addObserver(this.#handleModelChange);
  }

  get dateFrom() {
    return this.#pointsModel.points[0]?.dateFrom;
  }

  get dateTo() {
    return this.#pointsModel.points[0]?.dateTo;
  }

  init() {
    this.#destinations = this.#pointsModel.destinations;

    const points = this.#pointsModel.points;
    if (points.length > 0) {
      const dateFrom = this.dateFrom;
      const dateTo = this.dateTo;
      const previousHeaderInfoComponent = this.#pointInfoComponent;
      const totalCost = 11;

      const newTripInfoComponent = new HeaderInfo(dateFrom, dateTo, this.#destinations, totalCost);
      if (previousHeaderInfoComponent === null) {
        render(newTripInfoComponent, this.#pointInfoContainer, RenderPosition.BEFOREBEGIN);
      } else {
        replace(newTripInfoComponent, previousHeaderInfoComponent);
        remove(previousHeaderInfoComponent);
      }
      this.#pointInfoComponent = newTripInfoComponent;
    } else {
      remove(this.#pointInfoComponent);
      this.#pointInfoComponent = null;
    }
  }

  #handleModelChange = (updateType) => {
    if (updateType !== UpdateType.ERROR) {
      this.init();
    }
  };
}
