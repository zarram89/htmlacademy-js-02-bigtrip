export default class PointsModel {
  constructor(points) {
    this.points = points;
  }

  getAll() {
    return this.points;
  }

  getPointById(id) {
    return this.points.find((p) => p.id === id);
  }
}
