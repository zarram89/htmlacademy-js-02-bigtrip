export default class DestinationsModel {
  #destinations = null;
  #destinationsMap = null;

  constructor(destinations) {
    this.#destinations = destinations;

    this.#destinationsMap = new Map(
      this.#destinations.map((destination) => [destination.id, destination])
    );
  }

  getAll() {
    return this.#destinations;
  }

  getById(id) {
    return this.#destinationsMap.get(id);
  }
}
