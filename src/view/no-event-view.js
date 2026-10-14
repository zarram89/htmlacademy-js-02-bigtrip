import AbstractView from '../framework/view/abstract-view';
import { NoEventMessages } from '../const.js';

function createNoEventView(filterType) {
  return (
    `<p class="trip-events__msg">
      ${NoEventMessages[filterType]}
    </p>`
  );
}

export default class NoEventView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoEventView(this.#filterType);
  }
}
