import { SORTS } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { ucFirst } from '../utils.js';

function createSortTemplate() {
  const renderBoardsSorts = () => SORTS.map((sort, index) => `
  <div class="trip-sort__item  trip-sort__item--${sort}">
    <input
      id="sort-${sort}"
      class="trip-sort__input  visually-hidden"
      type="radio"
      name="trip-sort"
      value="sort-${sort}"
      ${sort === 'offers' || sort === 'event' ? 'disabled' : ''}
      ${index === 0 ? 'checked' : ''}
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
  constructor() {
    super();
  }

  get template() {
    return createSortTemplate();
  }
}
