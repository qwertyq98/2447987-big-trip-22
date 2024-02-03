import BoardPresenter from './presenter/board-presenter.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-button-view.js';
import { render } from './framework/render.js';
import { AUTHORIZATION, END_POINT } from './const.js';
import PointsApiService from './points-api-service.js';
import PointsModel from './model/points-model.js';

const boardContainerElement = document.querySelector('.trip-events');
const buttonContainerElement = document.querySelector('.trip-main');
const filterModel = new FilterModel();
const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

const boardPresenter = new BoardPresenter({
  boardContainer: boardContainerElement,
  pointsModel,
  filterModel,
  onNewPointDestroy: newPointFormCloseHandler,
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: newPointButtonClickHandler
});

boardPresenter.init();
pointsModel.init();
render(newPointButtonComponent, buttonContainerElement);

function newPointFormCloseHandler () {
  newPointButtonComponent.element.disabled = false;
}

function newPointButtonClickHandler () {
  boardPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

