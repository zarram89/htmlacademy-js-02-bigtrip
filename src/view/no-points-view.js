import AbstractView from '../framework/view/abstract-view.js';

function createNoPointsTemplate(filterType) {
  const messages = {
    everything: 'Click New Event to create your first point',
    future: 'There are no future events now',
    present: 'There are no present events now',
    past: 'There are no past events now',
  };

  return `
    <p class="trip-events__msg">
      ${messages[filterType]}
    </p>
  `;
}

export default class NoPointsView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointsTemplate(this.#filterType);
  }
}
