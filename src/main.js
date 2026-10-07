import TripInfoView from './view/trip-info-view';
import FilterView from './view/filter-view';
import { render, RenderPosition } from './render';
import TripPresenter from './presenter/trip-presenter';

const pageBodyElement = document.querySelector('.page-body');
const pageHeaderElement = pageBodyElement.querySelector('.page-header');
const tripMainElement = pageHeaderElement.querySelector('.trip-main');
const tripFiltersContainer = tripMainElement.querySelector('.trip-controls__filters');
const siteMainElement = pageBodyElement.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
const tripPresenter = new TripPresenter({ tripContainer: tripEventsElement });

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), tripFiltersContainer);
tripPresenter.init();
