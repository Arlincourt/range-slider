import Classes from '../../../types/classes';
import InterfacesNames from '../../../types/interfacesNames';
import Orientation from '../../../types/orientation';
import { IProgressBar, IInterval, IScale } from '../../../types/interfaces';
import setType from '../../../helpers/setType';
import ProgressBar from '../ProgressBar/ProgressBar';
import Scale from '../Scale/Scale';

class Interval {
  private interval: HTMLElement = document.createElement('div')

  private sliderBody: HTMLElement = document.createElement('div')

  private intervalState: IInterval

  private progressBar: ProgressBar;

  private progressBarData: IProgressBar;

  private scale: Scale;

  private scaleData: IScale

  constructor(intervalState: IInterval) {
    this.intervalState = { ...intervalState };
    this.progressBarData = setType(InterfacesNames.IProgressBar, this.intervalState);
    this.scaleData = setType(InterfacesNames.IScale, this.intervalState);
    this.progressBar = new ProgressBar(this.progressBarData);
    this.scale = new Scale(this.scaleData);
    this.addClass();
    this.addElems();
  }

  public update(intervalState: IInterval): void {
    if (this.intervalState.orientation !== intervalState.orientation) {
      this.addClass(intervalState.orientation);
    }
    if (this.intervalState.scale !== intervalState.scale) {
      this.addElems(intervalState.scale);
    }
    this.intervalState = { ...intervalState };
    this.progressBarData = setType(InterfacesNames.IProgressBar, this.intervalState);
    this.scaleData = setType(InterfacesNames.IScale, this.intervalState);
    this.progressBar.update(this.progressBarData);
    this.scale.update(this.scaleData);
  }

  get getIntervalState(): IInterval {
    return this.intervalState;
  }

  public getTemplate = (): HTMLElement => this.sliderBody;

  private addElems(scale: boolean = this.intervalState.scale): void {
    this.sliderBody.innerHTML = '';
    this.interval.append(this.progressBar.getTemplate());
    this.sliderBody.append(this.interval);
    if (scale) {
      this.sliderBody.append(this.scale.getTemplate());
    }
  }

  private addClass(orientation: Orientation = this.intervalState.orientation): void {
    this.interval.className = '';
    this.sliderBody.className = '';
    this.sliderBody.classList.add(Classes.sliderBody);
    this.interval.classList.add(Classes.sliderLine);

    if (orientation === Orientation.VERTICAL) {
      this.sliderBody.classList.add(Classes.sliderBodyVertical);
      this.interval.classList.add(Classes.sliderLineVertical);
      return;
    }
    this.sliderBody.classList.add(Classes.sliderBodyHorizontal);
    this.interval.classList.add(Classes.sliderLineHorizontal);
  }
}

export default Interval;
