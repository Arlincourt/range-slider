import Classes from '../../../types/classes';
import setType from '../../../helpers/setType';
import { IProgressBar, IInterval, IInfo } from '../../../types/interfaces';
import Info from '../Info/Info';
import InterfacesNames from '../../../types/interfacesNames';
import Orientation from '../../../types/orientation';
import ProgressBar from '../ProgressBar/ProgressBar';

class Interval {
  private interval: HTMLElement = document.createElement('div')

  private sliderBody: HTMLElement = document.createElement('div')

  private intervalState: IInterval

  private progressBar: ProgressBar;

  private progressBarData: IProgressBar;

  private info: Info;

  private infoData: IInfo

  constructor(intervalState: IInterval) {
    this.intervalState = intervalState;
    this.progressBarData = setType(InterfacesNames.IProgressBar, this.intervalState);
    this.infoData = setType(InterfacesNames.IInfo, this.intervalState);
    this.progressBar = new ProgressBar(this.progressBarData);
    this.info = new Info(this.infoData);
    this.addClass();
    this.addElems();
  }

  public update(intervalState: IInterval): void {
    if (this.intervalState.orientation !== intervalState.orientation) {
      this.addClass(intervalState.orientation);
    }
    this.intervalState = intervalState;
    this.progressBarData = setType(InterfacesNames.IProgressBar, this.intervalState);
    this.infoData = setType(InterfacesNames.IInfo, this.intervalState);
    this.progressBar.update(this.progressBarData);
    this.info.update(this.infoData);
  }

  get getIntervalState() {
    return this.intervalState;
  }

  public getTemplate(): HTMLElement {
    return this.sliderBody;
  }

  private addElems(): void {
    this.interval.append(this.progressBar.getTemplate());
    this.sliderBody.append(this.interval);
    this.sliderBody.append(this.info.getTemplate());
  }

  private addClass(orientation?: Orientation): void {
    this.interval.className = '';
    this.sliderBody.className = '';
    this.sliderBody.classList.add(Classes.sliderBody);
    this.interval.classList.add(Classes.sliderLine);

    if (orientation) {
      if (orientation === Orientation.VERTICAL) {
        this.sliderBody.classList.add(Classes.sliderBodyVertical);
        this.interval.classList.add(Classes.sliderLineVertical);
        return;
      }
      this.sliderBody.classList.add(Classes.sliderBodyHorizontal);
      this.interval.classList.add(Classes.sliderLineHorizontal);
      return;
    }

    if (this.intervalState.orientation === Orientation.VERTICAL) {
      this.sliderBody.classList.add(Classes.sliderBodyVertical);
      this.interval.classList.add(Classes.sliderLineVertical);
      return;
    }
    this.sliderBody.classList.add(Classes.sliderBodyHorizontal);
    this.interval.classList.add(Classes.sliderLineHorizontal);
  }
}

export default Interval;
