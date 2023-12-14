import { FULL_DATE_FORMAT, TIME_FORMAT, TYPES } from '../const.js';
import { createElement } from '../render.js';
import { getRandomArrayElement } from '../utils.js';
import { transformData, ucFirst } from '../utils.js';

function createEditFormTemplate(point) {
  const {
    base_price: price,
    date_from: dateFrom,
    date_to: dateTo,
    destination: {name, description},
    offers: {offers},
  } = point;

  return (
    `<form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${TYPES.map((type) => `
                <div class="event__type-item">
                  <input
                    id="event-type-${getRandomArrayElement(type)}-1"
                    class="event__type-input
                    visually-hidden"
                    type="radio"
                    name="event-type"
                    value="${getRandomArrayElement(type)}"
                  >
                  <label
                    class="event__type-label
                    event__type-label--${getRandomArrayElement(type)}"
                    for="event-type-${getRandomArrayElement(type)}-1"
                  >${ucFirst(getRandomArrayElement(type))}</label>
                </div>`).join('')}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            Flight
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input
            class="event__input
            event__input--time"
            id="event-start-time-1"
            type="text"
            name="event-start-time"
            value="${transformData(dateFrom, FULL_DATE_FORMAT)} ${transformData(dateFrom, TIME_FORMAT)}"
          >
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input
            class="event__input
            event__input--time"
            id="event-end-time-1"
            type="text"
            name="event-end-time"
            value="${transformData(dateTo, FULL_DATE_FORMAT)} ${transformData(dateTo, TIME_FORMAT)}"
          >
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${offers.map(({price: destinationPrice, title}) => `
              <div class="event__offer-selector">
                <input
                  class="event__offer-checkbox
                  visually-hidden"
                  id="event-offer-luggage-1"
                  type="checkbox"
                  name="event-offer-luggage"
                  ${destinationPrice > 100 ? 'checked' : ''}
                >
                <label class="event__offer-label" for="event-offer-luggage-1">
                  <span class="event__offer-title">${title}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${destinationPrice}</span>
                </label>
              </div>`).join('')}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>
        </section>
      </section>
    </form>`
  );
}

export default class EditFormView {
  constructor({ point }) {
    this.point = point;
  }

  getTemplate() {
    return createEditFormTemplate(this.point);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
