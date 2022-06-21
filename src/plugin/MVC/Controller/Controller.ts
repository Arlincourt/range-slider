import { IState, IEmit, IEmitEdge } from 'plugin/types/interfaces';
import Observer from '../../Observer/Observer';
import Model from '../Model/Model';
import View from '../View/View';

class Controller {
  private readonly _model: Model;

  private readonly _observer: Observer;

  private readonly _view: View;

  private _state: IState;

  constructor(element: HTMLElement, model: Model) {
    this._model = model;
    this._state = this._model.getState();
    this._view = new View(element, this._state);
    this._observer = new Observer();
    this._connect();
    this._addEvents();
  }

  private _connect(): void {
    this._model.observer = this._observer;
    this._view.observer = this._observer;
  }

  private _addEvents(): void {
    this._observer.subscribe('viewChange', this._updateModel.bind(this));
    this._observer.subscribe('modelChange', this._updateView.bind(this));
  }

  private _updateModel(state?: IEmit | IEmitEdge): void {
    if (state) {
      this._model.update(state);
    }
  }

  private _updateView = (): void => this._view.update(this._model.getState());
}

export default Controller;
