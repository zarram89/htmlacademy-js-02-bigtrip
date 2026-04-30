export default class DestinationsModel {
  #destinations = [];
  #destinationsMap = null;

  constructor(destinations) {
    this.#destinations = destinations;

    this.#destinationsMap = new Map(
      destinations.map((d) => [d.id, d])
    );
  }

  get destinations() {
    return this.#destinations;
  }

  getById(id) {
    return this.#destinationsMap.get(id);
  }
}
