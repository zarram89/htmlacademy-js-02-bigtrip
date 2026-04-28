import FilterView from './view/filter-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import { generateMockData } from './mock/data.js';
import PointsModel from './model/points-model.js';


const siteHeaderElement = document.querySelector('.page-header');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const siteBoardElement = siteMainElement.querySelector('.trip-events');
const pointsModel = new PointsModel(generateMockData());

const boardPresenter = new BoardPresenter({
  boardContainer: siteBoardElement,
  pointsModel,
});

render(new FilterView(), siteFilterElement);

boardPresenter.init();
