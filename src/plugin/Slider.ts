import Controller from './MVC/Controller/Controller';
import Model from './MVC/Model/Model';
import { IState, IOptions } from './types/interfaces';

class Slider {
  private _model: Model;

  constructor(options: IOptions, element: HTMLElement) {
    this._model = new Model(options);
    new Controller(element, this._model);
  }

  public getMin = (): number => this.getState().min;

  public getMax = (): number => this.getState().max;

  public getStep = (): number => this.getState().step;

  public getFirstValue = (): number => this.getState().value[0];

  public getSecondValue = (): number => this.getState().value[1];

  public getOrientation = (): string => this.getState().orientation;

  public getTips = (): boolean => this.getState().tips;

  public getRange = (): boolean => this.getState().range;

  public getProgress = (): boolean => this.getState().progressBar;

  public getState = (): IState => this._model.getState();

  public onChange(callback: <T>(...args: Array<T>) => Record<string, unknown>): void {
    this._model.setOnChangeMethod(callback);
    callback(this._model.getState());
  }

  public setMin = (value: number): void => this._model.setMin(value);

  public setMax = (value: number): void => this._model.setMax(value);

  public setFirstValue = (value: number): void => this._model.setFirstValue(value);

  public setSecondValue = (value: number): void => this._model.setSecondValue(value);

  public setStep = (value: number): void => this._model.setStep(value);

  public setScale = (scale: boolean): void => this._model.setScale(scale);

  public setOrientation = (orientation: string): void => this._model.setOrientation(orientation);

  public setRange = (range: boolean): void => this._model.setRange(range);

  public setProgress = (progress: boolean): void => this._model.setProgress(progress);

  public setTips = (tips: boolean): void => this._model.setTips(tips);
}

export default Slider;
