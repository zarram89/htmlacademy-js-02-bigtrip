export default class PointsModel {
  constructor({ points, destinations, offers }) {
    this.points = points;
    this.destinations = destinations;
    this.offers = offers;
  }

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getDestinationById(id) {
    return this.destinations.find((d) => d.id === id);
  }

  getOffersByType(type) {
    return this.offers.find((o) => o.type === type)?.offers || [];
  }
}
