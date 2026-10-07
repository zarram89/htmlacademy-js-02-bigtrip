import SortView from '../view/sort-view';
import EventListView from '../view/event-list-view';
import EventView from '../view/event-view';
import { render } from '../render';
import EventEditView from '../view/event-edit-view';


export default class TripPresenter {
  constructor({ tripContainer }) {
    this.tripContainer = tripContainer;
    this.eventListComponent = new EventListView();
  }

  init() {
    render(new SortView(), this.tripContainer);
    render(this.eventListComponent, this.tripContainer);

    const eventListElement = this.eventListComponent.getElement();

    render(new EventEditView(), eventListElement);

    for (let i = 0; i < 3; i++) {
      render(new EventView(), eventListElement);
    }
  }
}
