import Controller from './MVC/Controller/Controller';
import Model from './MVC/Model/Model';
import { IState, IOptions } from './types/interfaces';

class Slider {
  private model: Model;

  private controller: Controller;

  constructor(options: IOptions, element: HTMLElement) {
    this.model = new Model(options);
    this.controller = new Controller(element, this.model);
  }

  init() {

  }
}

export default Slider;
