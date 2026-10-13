export default class DestinationsModel {
  constructor(destinations) {
    this.destinations = destinations;

    this.destinationsMap = new Map(
      destinations.map((destination) => [destination.id, destination])
    );
  }

  getAll() {
    return this.destinations;
  }

  getById(id) {
    return this.destinationsMap.get(id);
  }
}
