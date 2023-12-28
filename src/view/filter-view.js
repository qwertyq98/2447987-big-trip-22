import AbstractView from '../framework/view/abstract-view.js';
import { ucFirst } from '../utils.js';

function createFilterTemplate(filters) {
  const renderBoardsFilters = () => filters.map(({type, count}, index) => `
  <div class="trip-filters__filter">
    <input
      id="filter-${type}"
      class="trip-filters__filter-input visually-hidden"
      type="radio"
      name="trip-filter"
      value="${type}"
      ${count === 0 ? 'disabled' : ''}
      ${index === 0 ? 'checked' : ''}
    >
    <label class="trip-filters__filter-label" for="filter-${type}">${ucFirst(type)}</label>
  </div>`).join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${renderBoardsFilters()}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FilterView extends AbstractView {
  #filters = {};

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
