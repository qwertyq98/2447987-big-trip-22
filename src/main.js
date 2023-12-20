import BoardPresenter from './presenter/board-presenter.js';
import PointModels from './model/points-model.js';

const boardContainerElement = document.querySelector('.trip-events');
const pointsModel = new PointModels();
pointsModel.initPoints();
const boardPresenter = new BoardPresenter({
  boardContainer: boardContainerElement,
  pointsModel,
});

boardPresenter.init();
