import Classes from '../../../types/classes';
import InterfacesNames from '../../../types/interfacesNames';
import Orientation from '../../../types/orientation';
import { IProgressBar, IInterval, IScale } from '../../../types/interfaces';
import setType from '../../../helpers/setType';
import ProgressBar from '../ProgressBar/ProgressBar';
import Scale from '../Scale/Scale';

class Interval {
  private _interval: HTMLElement = document.createElement('div');

  private _sliderBody: HTMLElement = document.createElement('div');
  
  private _intervalState: IInterval;

  private _progressBar: ProgressBar;

  private _progressBarData: IProgressBar;

  private _scale: Scale;

  private _scaleData: IScale;

  constructor(intervalState: IInterval) {
    this._intervalState = { ...intervalState };
    this._progressBarData = setType(InterfacesNames.IProgressBar, this._intervalState);
    this._scaleData = setType(InterfacesNames.IScale, this._intervalState);
    this._progressBar = new ProgressBar(this._progressBarData);
    this._scale = new Scale(this._scaleData);
    this._addClass();
    this._addElems();
  }

  public update(intervalState: IInterval): void {
    if (this._intervalState.orientation !== intervalState.orientation) {
      this._addClass(intervalState.orientation);
    }
    if (this._intervalState.scale !== intervalState.scale) {
      this._addElems(intervalState.scale);
    }
    this._intervalState = { ...intervalState };
    this._progressBarData = setType(InterfacesNames.IProgressBar, this._intervalState);
    this._scaleData = setType(InterfacesNames.IScale, this._intervalState);
    this._progressBar.update(this._progressBarData);
    this._scale.update(this._scaleData);
  }

  public getTemplate = (): HTMLElement => this._sliderBody;

  get getIntervalState(): IInterval {
    return this._intervalState;
  }

  private _addElems(scale: boolean = this._intervalState.scale): void {
    this._sliderBody.innerHTML = '';
    this._interval.append(this._progressBar.getTemplate());
    this._sliderBody.append(this._interval);
    if (scale) {
      this._sliderBody.append(this._scale.getTemplate());
    }
  }

  private _addClass(orientation: Orientation = this._intervalState.orientation): void {
    this._interval.className = '';
    this._sliderBody.className = '';
    this._sliderBody.classList.add(Classes.sliderBody);
    this._interval.classList.add(Classes.sliderLine);

    if (orientation === Orientation.VERTICAL) {
      this._sliderBody.classList.add(Classes.sliderBodyVertical);
      this._interval.classList.add(Classes.sliderLineVertical);
      return;
    }
    this._sliderBody.classList.add(Classes.sliderBodyHorizontal);
    this._interval.classList.add(Classes.sliderLineHorizontal);
  }
}

export default Interval;
