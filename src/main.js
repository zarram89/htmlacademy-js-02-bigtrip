import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';

import { mockPoints } from './mock/points-mock.js';
import { mockDestinations } from './mock/destinations-mock.js';
import { mockOffers } from './mock/offers-mock.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const siteBoardElement = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel(mockPoints);
const destinationsModel = new DestinationsModel(mockDestinations);
const offersModel = new OffersModel(mockOffers);
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  boardContainer: siteBoardElement,
  filterContainer: siteFilterElement,
  pointsModel,
  destinationsModel,
  offersModel,
  filterModel
});

boardPresenter.init();
