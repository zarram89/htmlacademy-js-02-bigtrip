import { render, replace, remove } from '../framework/render.js';
import { generateFilters } from '../mocks/filter-mock.js';
import { filter } from '../utils/filter-utils.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventView from '../view/event-view.js';
import NoEventView from '../view/no-event-view.js';

export default class TripPresenter {
  #tripContainer = null;
  #filterContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;

  #eventListComponent = new EventListView();
  #noEventComponent = null;
  #filterComponent = null;
  #sortComponent = null;
  #escKeyDownHandler = null;

  constructor({
    tripContainer,
    filterContainer,
    pointsModel,
    destinationsModel,
    offersModel,
    filterModel,
  }) {
    this.#tripContainer = tripContainer;
    this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
  }

  get #points() {
    const points = this.#pointsModel.points;
    const filterType = this.#filterModel.filter;
    return filter[filterType](points);
  }

  init() {
    this.#renderFilter();
    this.#renderTrip();
  }

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

  #handleFilterChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(filterType);
    this.#renderFilter();
    this.#clearTrip();
    this.#renderTrip();
  };

  #renderSort() {
    this.#sortComponent = new SortView();
    render(this.#sortComponent, this.#tripContainer);
  }

  #clearTrip() {
    this.#removeEscKeyDownHandler();
    remove(this.#sortComponent);
    this.#sortComponent = null;
    if (this.#noEventComponent) {
      remove(this.#noEventComponent);
      this.#noEventComponent = null;
    }
    remove(this.#eventListComponent);
  }

  #renderEvent(point) {
    const eventListElement = this.#eventListComponent.element;

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        this.#removeEscKeyDownHandler();
      }
    };

    const eventComponent = new EventView({
      point,
      destination: this.#destinationsModel.getById(point.destination),
      offers: this.#offersModel.getByIds(point.offerIds),
      onRolldownClick: () => {
        replaceCardToForm();
        this.#setEscKeyDownHandler(escKeyDownHandler);
      },
    });

    const eventEditComponent = new EventEditView({
      point,
      destination: this.#destinationsModel.getById(point.destination),
      offersByType: this.#offersModel.getByType(point.type),
      allDestinations: this.#destinationsModel.destinations,
      onFormSubmit: () => {
        replaceFormToCard();
        this.#removeEscKeyDownHandler();
      },
      onRollupClick: () => {
        replaceFormToCard();
        this.#removeEscKeyDownHandler();
      },
    });

    function replaceCardToForm() {
      replace(eventEditComponent, eventComponent);
    }

    function replaceFormToCard() {
      replace(eventComponent, eventEditComponent);
    }

    render(eventComponent, eventListElement);
  }

  #setEscKeyDownHandler(handler) {
    this.#removeEscKeyDownHandler();
    this.#escKeyDownHandler = handler;
    document.addEventListener('keydown', handler);
  }

  #removeEscKeyDownHandler() {
    if (this.#escKeyDownHandler) {
      document.removeEventListener('keydown', this.#escKeyDownHandler);
      this.#escKeyDownHandler = null;
    }
  }

  #renderNoEvent() {
    this.#noEventComponent = new NoEventView({
      filterType: this.#filterModel.filter,
    });
    render(this.#noEventComponent, this.#tripContainer);
  }

  #renderEventsList(events) {
    events.forEach((event) => this.#renderEvent(event));
  }

  #renderTrip() {
    const points = this.#points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoEvent();
      return;
    }

    this.#renderSort();
    render(this.#eventListComponent, this.#tripContainer);

    this.#renderEventsList(points);
  }
}
