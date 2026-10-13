import AbstractView from '../framework/view/abstract-view.js';
import { TYPES } from '../const.js';
import { humanizeDate } from '../utils/event-utils.js';

const BLANK_POINT = {
  id: 'new',
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  type: 'flight',
  offerIds: [],
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

function createEventEditTemplate({ point, destination, offersByType, allDestinations, }) {
  const { id, type, dateFrom, dateTo, basePrice, offerIds } = point;

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
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination?.name ?? ''}" list="destination-list-${id}">
            <datalist id="destination-list-${id}">
              ${destinationsList}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${humanizeDate(dateFrom)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${humanizeDate(dateTo)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
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

export default class EventEditView extends AbstractView {
  #point = null;
  #destination = null;
  #offersByType = null;
  #allDestinations = null;
  #handleFormSubmit = null;
  #handleRollupClick = null;

  constructor({
    point = BLANK_POINT,
    destination = {},
    offersByType = [],
    allDestinations = [],
    onFormSubmit,
    onRollupClick,
  }) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#offersByType = offersByType;
    this.#allDestinations = allDestinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupClick = onRollupClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollupClickHandler);
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
  }

  get template() {
    return createEventEditTemplate({
      point: this.#point,
      destination: this.#destination,
      offersByType: this.#offersByType,
      allDestinations: this.#allDestinations
    });
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };
}
