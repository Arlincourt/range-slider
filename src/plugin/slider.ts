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
  
  public getState(): IState {
    return this.model.getState()
  }
  public setMin(value: number): void {
    this.model.setMin(value)
  }
  public setMax(value: number): void {
    this.model.setMax(value)
  }
  public setFirstValue(value: number): void {
    this.model.setFirstValue(value)
  }
  public setSecondValue(value: number): void {
    this.model.setSecondValue(value)
  }
  public setStep(value: number): void {
    this.model.setStep(value)
  }
  public setOrientation(orientation: boolean): void {
    this.model.setOrientation(orientation)
  }
  public setRange(range: boolean): void {
    this.model.setRange(range)
  }
  public setTips(tips: boolean): void {
    this.model.setTips(tips)
  }
}

export default Slider;
