import { SORTS } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { ucFirst } from '../utils/utils.js';

function createSortTemplate(currentSortType) {
  const renderBoardsSorts = () => SORTS.map((sort, index) => `
  <div class="trip-sort__item  trip-sort__item--${sort}">
    <input
      id="sort-${sort}"
      class="trip-sort__input  visually-hidden"
      type="radio"
      name="trip-sort"
      value="sort-${sort}"
      ${sort === 'offers' || sort === 'event' ? 'disabled' : ''}
      ${currentSortType === sort ? 'checked' : ''}
      data-sort-type="${SORTS[index]}"
    >
    <label class="trip-sort__btn" for="sort-${sort}">${ucFirst(sort)}</label>
  </div>`).join('');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${renderBoardsSorts()}
    </form>`
  );
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentSortType = currentSortType;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT' || evt.target.dataset.sortType === 'offers' || evt.target.dataset.sortType === 'event') {
      return;
    }

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
