import { DATE_FORMAT, TIME_FORMAT } from '../const.js';
import { createElement } from '../render.js';
import { transformData } from '../utils.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

function createPointTemplate(point) {
  const {
    base_price: price,
    date_from: dateFrom,
    date_to: dateTo,
    destination: {name},
    offers: {offers: [{price: destinationPrice, title}]},
    is_favorite: isFavorite,
  } = point;

  const dateFromFormat = transformData(dateFrom, DATE_FORMAT);
  const timeFromFormat = transformData(dateFrom, TIME_FORMAT);
  const timeToFormat = transformData(dateTo, TIME_FORMAT);
  const durationOfStay = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)));
  const durationOfStayFormat = `${durationOfStay.days() > 1 ? `${durationOfStay.days()}D` : ''} ${durationOfStay.hours()}H ${durationOfStay.minutes()}M`;

  return (
    `<div class="event">
      <time class="event__date" datetime=${dateFromFormat}>${dateFromFormat}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/drive.png" alt="Event type icon">
      </div>
      <h3 class="event__title">Drive ${name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime=${dateFrom}>${timeFromFormat}</time>
          &mdash;
          <time class="event__end-time" datetime=${dateFrom}>${timeToFormat}</time>
        </p>
        <p class="event__duration">${durationOfStayFormat}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        <li class="event__offer">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${destinationPrice}</span>
        </li>
      </ul>
      <button class="event__favorite-btn  ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>`
  );
}

export default class PointView {
  constructor({point}) {
    this.point = point;
  }

  getTemplate() {
    return createPointTemplate(this.point);
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
