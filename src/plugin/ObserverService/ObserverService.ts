import IState from '../types/IState';
import Model from '../MVC/Model/Model';
import View from '../MVC/View/View';
import Observer from '../Observer/Observer';

class ObserverService {
  private readonly observer: Observer;

  private readonly model: Model;

  private readonly view: View;

  constructor(model: Model, view: View) {
    this.observer = new Observer();
    this.view = view;
    this.model = model;
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

  private updateModel(state?: IState): void {
    if (state) {
      this.model.update(state);
    }
  }

  private updateView(): void {
    this.view.update(this.model.getState());
  }
}

export default ObserverService;