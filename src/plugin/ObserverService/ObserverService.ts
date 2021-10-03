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
    this.observer.subscribe('viewChange', this.updateModel);
    this.observer.subscribe('modelChange', this.updateView);
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

// // Controller
// this.ObserverService(model, view)

// // ObserverService
// const observer = new Observer()
// this.model.observer = observer
// this.view.observer = observer
// observer.subscribe('viewChange', updateModel)
// observer.subscribe('modelChange', updateView)

// this.subscribes = {
//   'modelChange': [updateModel],
//   'viewChange': [updateView],
// }

// //model
// emitChange(data) {
//   this.observer.emit('modelChange', data)
// }
// //view
// emitChange(data) {
//   this.observer.emit('viewChange', data)
// }

// function updateView(data) {
//   this.view.update(data)
// }
// function updateModel(data) {
//   this.model.update(data)
// }
