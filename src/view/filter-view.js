import { FilterType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { ucFirst } from '../utils/utils.js';
const filtersNames = Object.values(FilterType);

function createFilterTemplate(filters) {
  const renderBoardsFilters = () => filters.map(({type, count}, index) => `
  <div class="trip-filters__filter">
    <input
      id="filter-${type}"
      class="trip-filters__filter-input visually-hidden"
      type="radio"
      name="trip-filter"
      value="${type}"
      ${count === 0 ? 'disabled = ' : ''}
      ${index === 0 ? 'checked' : ''}
      data-filter-type="${filtersNames[index]}"
    >
    <label
      class="trip-filters__filter-label"
      for="filter-${type}"
      ${count === 0 ? 'disabled = ' : ''}
    >${ucFirst(type)}</label>
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
  #handleFilterTypeChange = null;

  constructor({filters, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.getAttribute('disabled') === '' || evt.target.tagName !== 'INPUT') {
      return;
    }

    this.#handleFilterTypeChange(evt.target.dataset.filterType);
  };
}
