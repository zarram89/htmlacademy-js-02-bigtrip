export default class OffersModel {
  constructor(offers) {
    this.offers = offers;

    this.offersByType = new Map(
      offers.map((group) => [group.type, group.offers])
    );

    this.offersMap = new Map();

    offers.forEach((group) => {
      group.offers.forEach((offer) => {
        this.offersMap.set(offer.id, offer);
      });
    });
  }

  getByType(type) {
    return this.offersByType.get(type) || [];
  }

  getById(id) {
    return this.offersMap.get(id);
  }

  getByIds(ids = []) {
    return ids.map((id) => this.offersMap.get(id)).filter(Boolean);
  }

  getAll() {
    return this.offers;
  }
}
