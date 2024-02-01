import AbstractView from '../framework/view/abstract-view.js';
function createHeaderInfo(dateFrom, dateTo, destinations, totalCost) {
  return `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${destinations}</h1>

        <p class="trip-info__dates">${dateFrom} - ${dateTo}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
      </p>
    </section>
  `;
}

export default class HeaderInfo extends AbstractView {
  #dateFrom = null;
  #destinations = null;
  #dateTo = null;
  #totalCost = null;

  constructor(dateFrom, dateTo, destinations, totalCost) {
    super();
    this.#dateFrom = dateFrom;
    this.#destinations = destinations;
    this.#dateTo = dateTo;
    this.#totalCost = totalCost;
  }

  get template() {
    return createHeaderInfo(this.#dateFrom, this.#destinations, this.#dateTo, this.#totalCost);
  }
}

