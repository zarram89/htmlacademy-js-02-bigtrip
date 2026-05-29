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

  updatePoint(updatedPoint) {
    const index = this.#points.findIndex((point) => point.id === updatedPoint.id);

    if (index !== -1) {
      this.#points.splice(index, 1, updatedPoint);
    }
  }
}
