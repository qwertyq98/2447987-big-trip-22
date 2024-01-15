const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const CITIES = ['Hiroshima', 'Kopenhagen', 'Berlin', 'Nagasaki', 'Den Haag', 'Geneva', 'Munich', 'Moscow', 'Rotterdam', 'Monaco'];
const SORTS = ['day', 'event', 'time', 'price', 'offers'];
const POINT_COUNT = 3;
const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'hh:mm';
const FULL_DATE_FORMAT = 'DD/MM/YY';
const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};
const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};
const EmptyFiltersList = {
  everything: 'Click New Event to create your first point',
  past: 'There are no past events now',
  present: 'There are no present events now',
  future: 'There are no future events now',
};
const ModeType = {
  VIEWING: 'VIEWING',
  EDITING: 'EDITING',
  CREATE_NEW: 'CREATE_NEW',
};
const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};
const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};
const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};


export {
  TYPES,
  POINT_COUNT,
  DATE_FORMAT,
  FilterType,
  SORTS,
  TIME_FORMAT,
  FULL_DATE_FORMAT,
  CITIES,
  RenderPosition,
  EmptyFiltersList,
  ModeType,
  SortType,
  UserAction,
  UpdateType,
};
