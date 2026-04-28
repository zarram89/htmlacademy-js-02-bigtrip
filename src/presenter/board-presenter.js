import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  boardComponent = new EventListView();

  constructor({ boardContainer, pointsModel }) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.getPoints()];
    const firstPoint = this.boardPoints[0];

    render(new SortView(), this.boardContainer);
    render(this.boardComponent, this.boardContainer);
    render(new EditPointView({
      point: firstPoint,
      destination: this.pointsModel.getDestinationById(firstPoint.destinationId),
      offers: this.pointsModel
        .getOffersByType(firstPoint.type)
        .filter((offer) => firstPoint.offerIds.includes(offer.id)),
      allDestinations: this.pointsModel.getDestinations(),
      allOffers: this.pointsModel.getOffersByType(firstPoint.type)
    }), this.boardComponent.getElement());

    for (let i = 1; i < this.boardPoints.length; i++) {
      const point = this.boardPoints[i];

      render(
        new PointView({
          point,
          destination: this.pointsModel.getDestinationById(point.destinationId),
          offers: this.pointsModel
            .getOffersByType(point.type)
            .filter((offer) => point.offerIds.includes(offer.id))
        }),
        this.boardComponent.getElement()
      );
    }
  }
}
