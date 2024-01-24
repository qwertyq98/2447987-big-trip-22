import BoardPresenter from './presenter/board-presenter.js';
import PointModels from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-button-view.js';
import { render } from './framework/render.js';
import { AUTHORIZATION, END_POINT } from './const.js';
import PointsApiService from './points-api-service.js';

const boardContainerElement = document.querySelector('.trip-events');
const buttonContainer = document.querySelector('.trip-main');
const filterModel = new FilterModel();
const pointsModel = new PointModels({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const boardPresenter = new BoardPresenter({
  boardContainer: boardContainerElement,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});

pointsModel.init();

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}
render(newPointButtonComponent, buttonContainer);
pointsModel.initPoints();
boardPresenter.init();
