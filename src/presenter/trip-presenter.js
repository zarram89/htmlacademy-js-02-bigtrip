import { render, remove } from '../framework/render.js';
import { generateFilters } from '../mocks/filter-mock.js';
import { filter } from '../utils/filter-utils.js';
import { SortType } from '../const.js';
import { sort } from '../utils/sort-utils.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import NoEventView from '../view/no-event-view.js';
import EventPresenter from './event-presenter.js';

export default class TripPresenter {
  #tripContainer = null;
  #filterContainer = null;

  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;
  #sortModel = null;

  #eventListComponent = new EventListView();
  #noEventComponent = null;
  #filterComponent = null;
  #sortComponent = null;

  #eventPresenters = new Map();

  constructor({
    tripContainer,
    filterContainer,
    pointsModel,
    destinationsModel,
    offersModel,
    filterModel,
    sortModel,
  }) {
    this.#tripContainer = tripContainer;
    this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
    this.#sortModel = sortModel;
  }

  get points() {
    const points = this.#pointsModel.points;
    const filterType = this.#filterModel.filter;
    const sortType = this.#sortModel.sort;
    const filteredPoints = filter[filterType](points);

    return sort[sortType](filteredPoints);
  }

  init() {
    this.#renderFilter();
    this.#renderTrip();
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleEventChange = (updatedEvent) => {
    this.#pointsModel.updatePoint(updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #renderFilter() {
    const filters = generateFilters(this.#pointsModel.points);

    if (this.#filterComponent) {
      remove(this.#filterComponent);
    }

    this.#filterComponent = new FilterView({
      filters,
      currentFilter: this.#filterModel.filter,
      onFilterChange: this.#handleFilterChange,
    });

    render(this.#filterComponent, this.#filterContainer);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#sortModel.sort === sortType) {
      return;
    }

    this.#sortModel.setSort(sortType);
    this.#clearTrip();
    this.#renderTrip();
  };

  #handleFilterChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(filterType);
    this.#sortModel.setSort(SortType.DAY);
    this.#renderFilter();
    this.#clearTrip();
    this.#renderTrip();
  };

  #renderSort() {
    if (this.#sortComponent) {
      remove(this.#sortComponent);
    }

    this.#sortComponent = new SortView({
      currentSortType: this.#sortModel.sort,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#tripContainer);
  }

  #clearTrip() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    remove(this.#sortComponent);
    this.#sortComponent = null;
    if (this.#noEventComponent) {
      remove(this.#noEventComponent);
      this.#noEventComponent = null;
    }
    remove(this.#eventListComponent);
  }

  #renderEvent(point) {
    const eventPresenter = new EventPresenter({
      eventListContainer: this.#eventListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange
    });

    this.#eventPresenters.set(point.id, eventPresenter);
    eventPresenter.init(point);
  }


  #renderNoEvent() {
    this.#noEventComponent = new NoEventView({
      filterType: this.#filterModel.filter,
    });
    render(this.#noEventComponent, this.#tripContainer);
  }

  #renderEvents(events) {
    events.forEach((event) => this.#renderEvent(event));
  }

  #renderEventsList(events) {
    render(this.#eventListComponent, this.#tripContainer);
    this.#renderEvents(events);
  }

  #renderTrip() {
    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoEvent();
      return;
    }

    this.#renderSort();
    this.#renderEventsList(points);
  }
}
