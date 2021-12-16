import { IState } from 'plugin/types/interfaces';
import ObserverService from '../../ObserverService/ObserverService';
import Model from '../Model/Model';
import View from '../View/View';

class Controller {
  private model: Model;

  private view: View;

  private state: IState;

  constructor(element: HTMLElement, model: Model) {
    this.model = model;
    this.state = this.model.getState();
    this.view = new View(element, this.state);
    new ObserverService(this.model, this.view);
  }
}

export default Controller;
