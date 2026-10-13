import { render, RenderPosition } from './render.js';
import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import { mockPoints } from './mocks/points-mock.js';
import { mockDestinations } from './mocks/destinations-mock.js';
import { mockOffers } from './mocks/offers-mock.js';
import TripPresenter from './presenter/trip-presenter.js';

const pageBodyElement = document.querySelector('.page-body');
const pageHeaderElement = pageBodyElement.querySelector('.page-header');
const tripMainElement = pageHeaderElement.querySelector('.trip-main');
const tripFiltersContainer = tripMainElement.querySelector('.trip-controls__filters');
const siteMainElement = pageBodyElement.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
const pointsModel = new PointsModel(mockPoints);
const destinationsModel = new DestinationsModel(mockDestinations);
const offersModel = new OffersModel(mockOffers);
const tripPresenter = new TripPresenter({
  tripContainer: tripEventsElement,
  pointsModel,
  destinationsModel,
  offersModel,
});

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), tripFiltersContainer);
tripPresenter.init();
