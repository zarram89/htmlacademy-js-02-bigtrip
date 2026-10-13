import { render } from '../render.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventView from '../view/event-view.js';

export default class TripPresenter {
  eventListComponent = new EventListView();

  constructor({
    tripContainer,
    pointsModel,
    destinationsModel,
    offersModel,
  }) {
    this.tripContainer = tripContainer;
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  init() {
    this.tripPoints = [...this.pointsModel.getAll()];

    render(new SortView(), this.tripContainer);
    render(this.eventListComponent, this.tripContainer);

    const eventListElement = this.eventListComponent.getElement();
    const firstEvent = this.tripPoints[0];

    render(new EventEditView({
      point: firstEvent,
      destination: this.destinationsModel.getById(firstEvent.destination),
      offersByType: this.offersModel.getByType(firstEvent.type),
      allDestinations: this.destinationsModel.getAll(),
    }), eventListElement);

    for (let i = 1; i < this.tripPoints.length; i++) {
      const point = this.tripPoints[i];

      render(new EventView({
        point,
        destination: this.destinationsModel.getById(point.destination),
        offers: this.offersModel.getByIds(point.offerIds),
      }), eventListElement);
    }
  }
}

// import SortView from '../view/sort-view';
// import EventListView from '../view/event-list-view';
// import EventView from '../view/event-view';
// import { render } from '../render';
// import EventEditView from '../view/event-edit-view';

// export default class TripPresenter {
//   constructor({
//     tripContainer,
//     pointsModel,
//     destinationsModel,
//     offersModel,
//   }) {
//     this.tripContainer = tripContainer;
//     this.pointsModel = pointsModel;
//     this.destinationsModel = destinationsModel;
//     this.offersModel = offersModel;
//     this.eventListComponent = new EventListView();
//   }

//   init() {
//     this.tripPoints = [...this.pointsModel.getAll()];

//     render(new SortView(), this.tripContainer);
//     render(this.eventListComponent, this.tripContainer);

//     const eventListElement = this.eventListComponent.getElement();
//     const firstEvent = this.tripPoints[0];

//     render(new EventEditView({
//       point: firstEvent,
//       description: this.destinationsModel.getById(firstEvent.description),
//       offersByType: this.offersModel.getByType(firstEvent.type),
//       allDestinations: this.destinationsModel.getAll(),
//     }), eventListElement);

//     for (let i = 1; i < this.tripPoints.length; i++) {
//       const point = this.tripPoints[i];

//       render(new EventView({
//         point,
//         destination: this.destinationsModel.getById(point.destination),
//         offers: this.offersModel.getByIds(point.offerIds)
//       }), eventListElement);
//     }
//   }
// }
