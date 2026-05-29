import { render, replace } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDIT: 'EDIT',
};

export default class PointPresenter {
  #container = null;
  #point = null;
  #destinationsModel = null;
  #offersModel = null;
  #onPointChange = null;
  #onOpenForm = null;

  #pointComponent = null;
  #editPointComponent = null;
  #mode = Mode.DEFAULT;

  constructor({
    container,
    point,
    destinationsModel,
    offersModel,
    onPointChange,
    onOpenForm,
  }) {
    this.#container = container;
    this.#point = point;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#onPointChange = onPointChange;
    this.#onOpenForm = onOpenForm;
  }

  get id() {
    return this.#point.id;
  }

  init() {
    this.#pointComponent = this.#createPointComponent();
    this.#editPointComponent = this.#createEditPointComponent();
    render(this.#pointComponent, this.#container);
  }

  resetView() {
    if (this.#mode === Mode.EDIT) {
      this.#replaceFormToPoint();
    }
  }

  update(point) {
    this.#point = point;

    if (this.#mode === Mode.DEFAULT) {
      const newPointComponent = this.#createPointComponent();
      replace(newPointComponent, this.#pointComponent);
      this.#pointComponent = newPointComponent;
      this.#editPointComponent = this.#createEditPointComponent();
    }
  }

  destroy() {
    if (this.#escKeyDownHandler) {
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  }

  #createPointComponent() {
    const destination = this.#destinationsModel.getById(this.#point.destination);

    return new PointView({
      point: this.#point,
      destination,
      offers: this.#offersModel.getByIds(this.#point.offerIds),
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });
  }

  #createEditPointComponent() {
    const destination = this.#destinationsModel.getById(this.#point.destination);

    return new EditPointView({
      point: this.#point,
      destination,
      offersByType: this.#offersModel.getByType(this.#point.type),
      allDestinations: this.#destinationsModel.destinations,
      onFormSubmit: this.#handleFormSubmit,
      onRollupClick: this.#handleRollupClick,
    });
  }

  #handleEditClick = () => {
    this.#onOpenForm();
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleRollupClick = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFavoriteClick = (updatedPoint) => {
    this.#onPointChange(updatedPoint);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replacePointToForm() {
    replace(this.#editPointComponent, this.#pointComponent);
    this.#mode = Mode.EDIT;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#editPointComponent);
    this.#mode = Mode.DEFAULT;
  }
}
