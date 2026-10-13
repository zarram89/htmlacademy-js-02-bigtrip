import { render, replace } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventView from '../view/event-view.js';

export default class TripPresenter {
  #tripContainer = null;

  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #eventListComponent = new EventListView();

  #tripPoints = [];

  constructor({
    tripContainer,
    pointsModel,
    destinationsModel,
    offersModel,
  }) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.getAll()];

    render(new SortView(), this.#tripContainer);
    render(this.#eventListComponent, this.#tripContainer);

    // const firstEvent = this.#tripPoints[0];

    // render(new EventEditView({
    //   point: firstEvent,
    //   destination: this.#destinationsModel.getById(firstEvent.destination),
    //   offersByType: this.#offersModel.getByType(firstEvent.type),
    //   allDestinations: this.#destinationsModel.getAll(),
    // }), eventListElement);

    for (let i = 0; i < this.#tripPoints.length; i++) {
      // render(new EventView({
      //   point,
      //   destination: this.#destinationsModel.getById(point.destination),
      //   offers: this.#offersModel.getByIds(point.offerIds),
      // }), eventListElement);
      const point = this.#tripPoints[i];

      this.#renderEvent(point);
    }
  }

  #renderEvent(point) {
    const eventListElement = this.#eventListComponent.element;

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const eventComponent = new EventView({
      point,
      destination: this.#destinationsModel.getById(point.destination),
      offers: this.#offersModel.getByIds(point.offerIds),
      onRolldownClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      },
    });

    const eventEditComponent = new EventEditView({
      point,
      destination: this.#destinationsModel.getById(point.destination),
      offersByType: this.#offersModel.getByType(point.type),
      allDestinations: this.#destinationsModel.getAll(),
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onRollupClick: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
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
}
