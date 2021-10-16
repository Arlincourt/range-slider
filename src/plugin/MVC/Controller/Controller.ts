import ObserverService from '../../ObserverService/ObserverService';
import Model from '../Model/Model';
import View from '../View/View';

class Controller {
  private model: Model;

  private view: View;

  constructor(element: HTMLElement, model: Model) {
    this.model = model;
    this.view = new View(element, this.model.getState());
    new ObserverService(this.model, this.view);
  }
}

export default Controller;
