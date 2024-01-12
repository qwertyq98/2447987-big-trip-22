import { CITIES, FULL_DATE_FORMAT, TIME_FORMAT, TYPES } from '../const.js';
import { transformData, ucFirst } from '../utils/utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

function createEditFormTemplate(point, destinations, offers) {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    type: offerTypeName,
    offers: offersList,
    id,
  } = point;
  const pointDestination = destinations.find((dest) => dest?.id === destination);
  const typeOffers = offers.find((offer) => offer?.type === offerTypeName).offers;
  const pointOffers = typeOffers.filter((typeOffer) => offersList.includes(typeOffer?.id));

  const renderRoutesTypes = () => TYPES.map((type) => `
  <div class="event__type-item">
    <input
      id="event-type-${type}-${id}"
      class="event__type-input
      visually-hidden"
      type="radio"
      name="event-type"
      value="${type}"
      ${offerTypeName === type ? 'checked' : ''}
    >
    <label
      class="event__type-label event__type-label--${type}"
      for="event-type-${type}-${id}"
    >${ucFirst(type)}</label>
  </div>`).join('');

  const renderOffersTypes = (offersTypes) => {
    if(offersTypes.length !== 0) {
      return `
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${offersTypes.map((offerType) => `
              <div class="event__offer-selector">
                <input
                  class="event__offer-checkbox
                  visually-hidden"
                  id="event-offer-${offerType.id}"
                  type="checkbox"
                  name="event-offer-${offerType.title}"
                  ${pointOffers.includes(offerType) ? 'checked' : ''}
                  data-offer-id="${offerType.id}"
                >
                <label class="event__offer-label" for="event-offer-${offerType.id}">
                  <span class="event__offer-title">${offerType.title}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${offerType.price}</span>
                </label>
              </div>`).join('')}
          </div>
        </section>`;
    } else {
      return '';
    }
  };

  const renderPointDestination = (pointDest) => {
    const description = pointDest.description;
    const pictures = pointDest.pictures;

    if (description !== '' && pictures.length !== 0) {
      return `
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
        ${pictures.length !== 0 ? `
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${pictures.map((picture) => `<img class="event__photo" src=${picture.src} alt=${picture.description}>`).join('')}
            </div>
          </div>
        ` : ''}
      </section>`;
    } else {
      return '';
    }
  };

  const renderCityOptionsList = () => CITIES.map((city) => `<option value="${city}"></option>`).join('');

  const renderTypeWrapper = () => `
  <div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${offerTypeName}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">
    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${renderRoutesTypes()}
      </fieldset>
    </div>
  </div>`;

  const renderEventFieldGroups = () => `
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label event__type-output" for="event-destination-${id}">
        ${ucFirst(offerTypeName)}
      </label>
      <input
        class="event__input event__input--destination"
        id="event-destination-${id}"
        type="text"
        name="event-destination"
        value=${pointDestination?.name || ''}
        list="destination-list-${id}"
      >
      <datalist id="destination-list-${id}">
        ${renderCityOptionsList()}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${id}">From</label>
      <input
        class="event__input
        event__input--time"
        id="event-start-time-${id}"
        type="text"
        name="event-start-time"
        value="${transformData(dateFrom, FULL_DATE_FORMAT)} ${transformData(dateFrom, TIME_FORMAT)}"
      >
      &mdash;
      <label class="visually-hidden" for="event-end-time-${id}">To</label>
      <input
        class="event__input
        event__input--time"
        id="event-end-time-${id}"
        type="text"
        name="event-end-time"
        value="${transformData(dateTo, FULL_DATE_FORMAT)} ${transformData(dateTo, TIME_FORMAT)}"
      >
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-${id}">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
    </div>`;

  return (
    `<form class="event event--edit" action="#" method="post">
      <header class="event__header">
        ${renderTypeWrapper()}
        ${renderEventFieldGroups()}
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${renderOffersTypes(typeOffers)}
        ${renderPointDestination(pointDestination)}
      </section>
    </form>`
  );
}

export default class EditFormView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #handleFormSubmit = null;
  #point = null;
  #handleFormClose = null;
  #dateFrom = null;
  #dateTo = null;
  constructor({ point, boardDestinations, boardOffers, onFormSubmit, onCloseForm }) {
    super();
    this.#point = point;
    this.#destinations = boardDestinations;
    this._setState(point);
    this.#offers = boardOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onCloseForm;
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit')?.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')?.addEventListener('click', this.#formCloseHandler);
    this.element.querySelector('.event__save-btn')?.addEventListener('click', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group')?.addEventListener('change', this.#changeTransportTypeHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#selectOfferHandler);
    this.element.querySelector('.event__input--price')?.addEventListener('input', this.#priceInputHandler);
    this.element.querySelector('.event__input--destination')?.addEventListener('change', this.#destinationInputHandler);
    this.#setDatepicker();
  }

  get template() {
    return createEditFormTemplate(this._state, this.#destinations, this.#offers);
  }

  reset() {
    this.updateElement({...this.#point, ...this.#offers});
  }

  removeElement() {
    super.removeElement();

    if (this.#dateFrom) {
      this.#dateFrom.destroy();
      this.#dateFrom = null;
    }

    if (this.#dateTo) {
      this.#dateTo.destroy();
      this.#dateTo = null;
    }
  }

  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit({...this._state});
  };

  #setDatepicker() {
    this.#dateFrom = flatpickr(
      this.element.querySelector(`#event-start-time-${this.#point.id}`),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
        ['time_24hr']: true
      },
    );
    this.#dateTo = flatpickr(
      this.element.querySelector(`#event-end-time-${this.#point.id}`),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
        ['time_24hr']: true,
        minDate: this._state.dateFrom,
      },
    );
  }

  #dateFromChangeHandler = ([dateFrom]) => {
    this._setState({dateFrom: dateFrom});
    this.#dateTo.set('minDate', dateFrom);
  };

  #dateToChangeHandler = ([dateTo]) => {
    this._setState({dateTo: dateTo});
  };

  #changeTransportTypeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({type: evt.target.value, offers: []});
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({basePrice: evt.target.value});
  };

  #selectOfferHandler = (evt) => {
    if (evt.target.tagName === 'INPUT') {
      if (evt.target.checked) {
        this._setState({offers: [...this._state.offers, evt.target.dataset.offerId]});
      } else {
        this._setState({offers: this._state.offers.filter((offer) => offer !== evt.target.dataset.offerId)});
      }
      this.updateElement(this._state.offers);
    }
  };

  #destinationInputHandler = (evt) => {
    if (evt.target.tagName === 'INPUT') {
      const newDestination = this.#destinations.find((dest) => dest?.name === evt.target.value);
      this.updateElement({destination: newDestination.id});
    }
  };
}
