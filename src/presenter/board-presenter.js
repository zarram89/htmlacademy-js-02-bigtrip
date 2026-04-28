import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  boardComponent = new EventListView();

  constructor({
    boardContainer,
    pointsModel,
    destinationsModel,
    offersModel
  }) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.getAll()];

    render(new SortView(), this.boardContainer);
    render(this.boardComponent, this.boardContainer);

    if (!this.boardPoints.length) {
      return;
    }

    const firstPoint = this.boardPoints[0];

    render(
      new EditPointView({
        point: firstPoint,
        destination: this.destinationsModel.getById(firstPoint.destination),
        offersByType: this.offersModel.getByType(firstPoint.type),
        allDestinations: this.destinationsModel.getAll(),
      }),
      this.boardComponent.getElement()
    );

    for (let i = 1; i < this.boardPoints.length; i++) {
      const point = this.boardPoints[i];

      render(
        new PointView({
          point,
          destination: this.destinationsModel.getById(point.destination),
          offers: this.offersModel.getByIds(point.offerIds)
        }),
        this.boardComponent.getElement()
      );
    }
  }
}
