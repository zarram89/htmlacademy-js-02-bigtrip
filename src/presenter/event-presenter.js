import { render, replace, remove } from '../framework/render.js';
import EventEditView from '../view/event-edit-view.js';
import EventView from '../view/event-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #eventListContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #eventComponent = null;
  #eventEditComponent = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor({ eventListContainer, destinationsModel, offersModel, onDataChange, onModeChange }) {
    this.#eventListContainer = eventListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView({
      point,
      destination: this.#destinationsModel.getById(point.destination),
      offers: this.#offersModel.getByIds(point.offerIds),
      onRolldownClick: () => {
        this.#replaceCardToForm();
        this.#setEscKeyDownHandler();
      },
      onFavoriteClick: () => {
        this.#handleFavoriteClick();
      },
    });

    this.#eventEditComponent = new EventEditView({
      point,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onFormSubmit: (updatedPoint) => {
        this.#handleDataChange(updatedPoint);
        this.#replaceFormToCard();
        this.#removeEscKeyDownHandler();
      },
      onRollupClick: () => {
        this.#replaceFormToCard();
        this.#removeEscKeyDownHandler();
      },
    });

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#eventListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    this.#removeEscKeyDownHandler();
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  #handleFavoriteClick() {
    this.#handleDataChange({
      ...this.#point,
      isFavorite: !this.#point.isFavorite,
    });
  }

  #replaceCardToForm() {
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
    replace(this.#eventEditComponent, this.#eventComponent);
  }

  #replaceFormToCard() {
    this.#eventEditComponent.reset(this.#point);
    replace(this.#eventComponent, this.#eventEditComponent);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
      this.#removeEscKeyDownHandler();
    }
  };

  #setEscKeyDownHandler() {
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #removeEscKeyDownHandler() {
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }
}
