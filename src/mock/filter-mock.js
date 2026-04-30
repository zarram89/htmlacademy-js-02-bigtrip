import { FilterType } from '../const.js';
import { filter } from '../utils.js';

function generateFilters(points) {
  return Object.values(FilterType).map((type) => ({
    type,
    isDisabled: filter[type](points).length === 0
  }));
}

export { generateFilters };
