import { render, remove } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import NoPointsView from '../view/no-points-view.js';
import PointPresenter from './point-presenter.js';

import { generateFilters } from '../mock/filter-mock.js';
import { filter } from '../utils.js';

export default class BoardPresenter {
  #boardContainer = null;
  #filterContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;

  #boardComponent = new EventListView();
  #sortComponent = new SortView();
  #noPointsComponent = null;
  #filterComponent = null;
  #pointPresenters = [];

  constructor({
    boardContainer,
    filterContainer,
    pointsModel,
    destinationsModel,
    offersModel,
    filterModel
  }) {
    this.#boardContainer = boardContainer;
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
    this.#renderBoard();
  }

  #renderFilter() {
    const filters = generateFilters(this.#pointsModel.points);

    if (this.#filterComponent) {
      remove(this.#filterComponent);
    }

    this.#filterComponent = new FilterView({
      filters,
      currentFilter: this.#filterModel.filter,
      onFilterChange: this.#handleFilterChange
    });

    render(this.#filterComponent, this.#filterContainer);
  }

  #handleFilterChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(filterType);
    this.#renderFilter();
    this.#clearBoard();
    this.#renderBoard();
  };

  #clearBoard() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters = [];

    remove(this.#sortComponent);
    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }
    this.#boardComponent.element.innerHTML = '';
  }

  #renderBoard() {
    const points = this.#points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoPoints();
      return;
    }

    render(this.#sortComponent, this.#boardContainer);
    render(this.#boardComponent, this.#boardContainer);

    points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderNoPoints() {
    this.#noPointsComponent = new NoPointsView({
      filterType: this.#filterModel.filter
    });
    render(this.#noPointsComponent, this.#boardContainer);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      container: this.#boardComponent.element,
      point,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onPointChange: this.#handlePointChange,
      onOpenForm: this.#handleOpenForm,
    });

    this.#pointPresenters.push(pointPresenter);
    pointPresenter.init();
  }

  #handlePointChange = (updatedPoint) => {
    this.#pointsModel.updatePoint(updatedPoint);

    const pointPresenter = this.#pointPresenters
      .find((presenter) => presenter.id === updatedPoint.id);

    pointPresenter.update(updatedPoint);
  };

  #handleOpenForm = () => {
    this.#resetAllPointViews();
  };

  #resetAllPointViews() {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  }
}
