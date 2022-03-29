import { IState, IEmit, IEmitEdge } from 'plugin/types/interfaces';
import Observer from '../../Observer/Observer';
import Model from '../Model/Model';
import View from '../View/View';

class Controller {
  private readonly model: Model;

  private readonly observer: Observer;

  private readonly view: View;

  private state: IState;

  constructor(element: HTMLElement, model: Model) {
    this.model = model;
    this.state = this.model.getState();
    this.view = new View(element, this.state);
    this.observer = new Observer();
    this.connect();
    this.addEvents();
  }

  private connect(): void {
    this.model.observer = this.observer;
    this.view.observer = this.observer;
  }

  private addEvents(): void {
    this.observer.subscribe('viewChange', this.updateModel.bind(this));
    this.observer.subscribe('modelChange', this.updateView.bind(this));
  }

  private updateModel(state?: IEmit | IEmitEdge): void {
    if (state) {
      this.model.update(state);
    }
  }

  private updateView = (): void => this.view.update(this.model.getState());
}

export default Controller;
