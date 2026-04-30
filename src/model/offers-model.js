export default class OffersModel {
  #offers = [];
  #offersMap = null;
  #offersByType = null;

  constructor(offers) {
    this.#offers = offers;

    this.#offersByType = new Map(
      this.#offers.map((group) => [group.type, group.offers])
    );

    this.#offersMap = new Map();

    this.#offers.forEach((group) => {
      group.offers.forEach((offer) => {
        this.#offersMap.set(offer.id, offer);
      });
    });
  }

  get offers() {
    return this.#offers;
  }

  getByType(type) {
    return this.#offersByType.get(type) || [];
  }

  getById(id) {
    return this.#offersMap.get(id);
  }

  getByIds(ids = []) {
    return ids.map((id) => this.#offersMap.get(id)).filter(Boolean);
  }
}
