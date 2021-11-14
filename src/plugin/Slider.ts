import Controller from './MVC/Controller/Controller';
import Model from './MVC/Model/Model';
import { IState, IOptions } from './types/interfaces';

class Slider {
  private model: Model;

  constructor(options: IOptions, element: HTMLElement) {
    this.model = new Model(options);
    new Controller(element, this.model);
  }

  public getMin(): number {
    return this.getState().min;
  }

  public getMax(): number {
    return this.getState().max;
  }

  public getStep(): number {
    return this.getState().step;
  }

  public getFirstValue(): number {
    return this.getState().value[0];
  }

  public getSecondValue(): number {
    return this.getState().value[1];
  }

  public getOrientation(): string {
    return this.getState().orientation;
  }

  public getTips(): boolean {
    return this.getState().tips;
  }

  public getRange(): boolean {
    return this.getState().range;
  }

  public getProgress(): boolean {
    return this.getState().progressBar;
  }

  public getState(): IState {
    return this.model.getState();
  }

  public onChange(callback: <T>(...args: Array<T>) => Record<string, unknown>): void {
    this.model.setOnChangeMethod(callback);
    callback(this.model.getState());
  }

  public setMin(value: number): void {
    this.model.setMin(value);
  }

  public setMax(value: number): void {
    this.model.setMax(value);
  }

  public setFirstValue(value: number): void {
    this.model.setFirstValue(value);
  }

  public setSecondValue(value: number): void {
    this.model.setSecondValue(value);
  }

  public setStep(value: number): void {
    this.model.setStep(value);
  }

  public setOrientation(orientation: string): void {
    this.model.setOrientation(orientation);
  }

  public setRange(range: boolean): void {
    this.model.setRange(range);
  }
  
  public setProgress(progress: boolean): void {
    this.model.setProgress(progress);
  }

  public setTips(tips: boolean): void {
    this.model.setTips(tips);
  }
}

export default Slider;
