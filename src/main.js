import FilterView from './view/filter-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const boardContainerElement = document.querySelector('.trip-events');
const filtersContainerComponent = document.querySelector('.trip-controls__filters');
const boardPresenter = new BoardPresenter({boardContainer: boardContainerElement});

render(new FilterView(), filtersContainerComponent);

boardPresenter.init();
