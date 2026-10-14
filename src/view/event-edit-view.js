import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { TYPES } from '../const.js';
import { humanizeDate } from '../utils/event-utils.js';

const BLANK_POINT = {
  id: 'new',
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offerIds: [],
  type: 'flight',
};

function createTypesTemplate(currentType, id) {
  return TYPES.map((type) => `
    <div class="event__type-item">
      <input
        id="event-type-${type}-${id}"
        class="event__type-input visually-hidden"
        type="radio"
        name="event-type-${id}"
        value="${type}"
        ${type === currentType ? 'checked' : ''}
      >
      <label class="event__type-label event__type-label--${type}" for="event-type-${type}-${id}">
        ${type}
      </label>
    </div>
  `).join('');
}

function createDestinationsList(destinations = []) {
  return destinations.map((destination) =>
    `<option value="${destination.name}"></option>`
  ).join('');
}

function createOffersTemplate(offersByType = [], selectedOfferIds = []) {
  if (!offersByType.length) {
    return '';
  }

  const offersTemplate = offersByType.map((offer) => `
    <div class="event__offer-selector">
      <input
        class="event__offer-checkbox visually-hidden"
        id="event-offer-${offer.id}"
        type="checkbox"
        name="event-offer-${offer.id}"
        data-offer-id="${offer.id}"
        ${selectedOfferIds.includes(offer.id) ? 'checked' : ''}
      >
      <label class="event__offer-label" for="event-offer-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>
  `).join('');

  return `
    <section class="event__section event__section--offers">
      <h3 class="event__section-title event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersTemplate}
      </div>
    </section>
  `;
}

function createDestinationTemplate(destination) {
  if (!destination) {
    return '';
  }

  const { description, pictures = [] } = destination;

  const photosTemplate = pictures.length
    ? `
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${pictures.map((photo) => `
            <img class="event__photo" src="${photo.src}" alt="${photo.description}">
          `).join('')}
        </div>
      </div>
    `
    : '';

  if (!description && !pictures.length) {
    return '';
  }

  return `
    <section class="event__section event__section--destination">
      <h3 class="event__section-title event__section-title--destination">Destination</h3>
      ${description ? `<p class="event__destination-description">${description}</p>` : ''}
      ${photosTemplate}
    </section>
  `;
}

function createEventEditTemplate({ point, destination, offersByType, allDestinations }) {
  const { id, type, dateFrom, dateTo, basePrice, offerIds, isDisabled, isSaving, isDeleting } = point;

  const typesTemplate = createTypesTemplate(type, id);

  const destinationsList = createDestinationsList(allDestinations);

  const offersTemplate = createOffersTemplate(offersByType, offerIds);

  const destinationTemplate = createDestinationTemplate(destination);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${typesTemplate}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${id}">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination?.name ?? ''}" list="destination-list-${id}" ${isDisabled ? 'disabled' : ''}>
            <datalist id="destination-list-${id}">
              ${destinationsList}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${humanizeDate(dateFrom)}" ${isDisabled ? 'disabled' : ''}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${humanizeDate(dateTo)}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
          <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${offersTemplate}
          ${destinationTemplate}
        </section>
      </form>
    </li>`
  );
}

export default class EventEditView extends AbstractStatefulView {
  #destinationsModel = null;
  #offersModel = null;
  #handleFormSubmit = null;
  #handleRollupClick = null;

  constructor({ point = BLANK_POINT, destinationsModel, offersModel, onFormSubmit, onRollupClick }) {
    super();
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupClick = onRollupClick;

    this._setState(EventEditView.parsePointToState(point));
    this._restoreHandlers();
  }

  get template() {
    const point = this._state;
    const destination = this.#destinationsModel.getById(point.destination);
    const offersByType = this.#offersModel.getByType(point.type);

    return createEventEditTemplate({
      point,
      destination,
      offersByType,
      allDestinations: this.#destinationsModel.destinations,
    });
  }

  reset(point) {
    this.updateElement(EventEditView.parsePointToState(point));
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollupClickHandler);
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#priceChangeHandler);

    const offersContainer = this.element.querySelector('.event__available-offers');
    if (offersContainer) {
      offersContainer.addEventListener('change', this.#offerChangeHandler);
    }
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EventEditView.parseStateToPoint(this._state));
  };

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offerIds: [],
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const destinationName = evt.target.value;
    const destination = this.#destinationsModel.destinations
      .find((item) => item.name === destinationName);

    this.updateElement({
      destination: destination ? destination.id : null,
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({ basePrice: Number(evt.target.value) });
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const offerId = evt.target.dataset.offerId;
    const checked = evt.target.checked;
    const offerIds = this._state.offerIds.slice();

    if (checked) {
      offerIds.push(offerId);
    } else {
      const index = offerIds.indexOf(offerId);
      offerIds.splice(index, 1);
    }

    this.updateElement({ offerIds });
  };

  static parsePointToState(point) {
    return {
      ...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state };
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;
    return point;
  }
}
