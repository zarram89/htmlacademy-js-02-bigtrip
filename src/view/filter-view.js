import AbstractView from '../framework/view/abstract-view.js';

function createFilterItem(filter, currentFilter, isDisabled) {
  return `
    <div class="trip-filters__filter">
      <input
        id="filter-${filter}"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        value="${filter}"
        ${filter === currentFilter ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label class="trip-filters__filter-label" for="filter-${filter}">
        ${filter}
      </label>
    </div>
  `;
}

function createFilterTemplate(filters, currentFilter) {
  return `
    <form class="trip-filters">
      ${filters.map(({ type, isDisabled }) =>
    createFilterItem(type, currentFilter, isDisabled)
  ).join('')}
    </form>
  `;
}

export default class FilterView extends AbstractView {
  #filters;
  #currentFilter;
  #handleFilterChange;

  constructor({ filters, currentFilter, onFilterChange }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
    this.#handleFilterChange = onFilterChange;

    this.element.addEventListener('change', this.#filterChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterChangeHandler = (evt) => {
    if (evt.target.name === 'trip-filter') {
      this.#handleFilterChange(evt.target.value);
    }
  };
}
