//import Filters from './view/Filters.js';
//import Sorting from './view/Sorting.js';
//import CreateForm from './view/CreateForm.js';
import EditForm from './view/EditForm.js';
import RoutePoint from './view/RoutePoint.js';
import { createSampleData } from './Model.js';

export default class Presenter {
  constructor(container) {
    this.container = container;
    this.routePoints = createSampleData(); // Получение временных данных
  }

  init() {
    this.renderRoutePoints();
  }

  renderRoutePoints() {
    this.routePoints.forEach((pointData) => {
      const routePoint = new RoutePoint(pointData);
      document.body.appendChild(routePoint.element);
      this.addEventListeners(routePoint);
    });
  }

  addEventListeners(routePoint) {
    routePoint.element.querySelector('.edit-button').addEventListener('click', () => {
      this.replaceWithEditForm(routePoint);
    });
  }

  replaceWithEditForm(routePoint) {
    const editForm = new EditForm(routePoint.data);
    routePoint.element.replaceWith(editForm.element);
    editForm.element.addEventListener('submit', (event) => {
      event.preventDefault();
      this.replaceWithRoutePoint(editForm);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.replaceWithRoutePoint(editForm);
      }
    });
  }

  replaceWithRoutePoint(editForm) {
    const routePoint = new RoutePoint(editForm.data);
    editForm.element.replaceWith(routePoint.element);
    this.addEventListeners(routePoint);
  }
}
