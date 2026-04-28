import FilterView from './view/filter-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const siteBoardElement = siteMainElement.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({boardContainer: siteBoardElement});

render(new FilterView(), siteFilterElement);

boardPresenter.init();
