const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const CITIES = ['Hiroshima', 'Kopenhagen', 'Berlin', 'Nagasaki', 'Den Haag', 'Geneva', 'Munich', 'Moscow', 'Rotterdam', 'Monaco'];
const SORTS = ['day', 'event', 'time', 'price', 'offers'];
const POINT_COUNT = 3;
const DATE_FORMAT = 'D MMM';
const TIME_FORMAT = 'hh:mm';
const FULL_DATE_FORMAT = 'YY/MM/DD';
const RENDER_POSITION = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};
const FILTERS = {
  EVERYTHING: 'everything',
  PRESENT: 'present',
  FUTURE: 'future',
  PAST: 'past',
};

export {
  TYPES,
  POINT_COUNT,
  DATE_FORMAT,
  FILTERS,
  SORTS,
  TIME_FORMAT,
  FULL_DATE_FORMAT,
  CITIES,
  RENDER_POSITION,
};
