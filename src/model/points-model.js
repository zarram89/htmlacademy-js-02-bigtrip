export default class PointsModel {
  #points = [];

  constructor(points) {
    this.#points = points;
  }

  get points() {
    return this.#points;
  }

  getPointById(id) {
    return this.#points.find((p) => p.id === id);
  }
}
