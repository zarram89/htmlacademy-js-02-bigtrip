export default class PointsModel {
  #points = null;

  constructor(points) {
    this.#points = points;
  }

  getAll() {
    return this.#points;
  }

  getPointById(id) {
    return this.#points.find((point) => point.id === id);
  }
}
