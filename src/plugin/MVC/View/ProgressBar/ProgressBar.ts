import Classes from '../../../types/classes';
import InterfacesNames from '../../../types/interfacesNames';
import Orientation from '../../../types/orientation';
import { IRunnerService, IProgressBar } from '../../../types/interfaces';
import setType from '../../../helpers/setType';
import copyObject from '../../../helpers/copyObject';
import RunnerService from '../RunnerService/RunnerService';

class ProgressBar {
  private progressBar: HTMLElement = document.createElement('div')

  private progressBarState: IProgressBar;

  private runnerService: RunnerService;

  private runnerServiceData: IRunnerService;

  constructor(progressBarState: IProgressBar) {
    this.progressBarState = copyObject(progressBarState);
    this.runnerServiceData = setType(InterfacesNames.IRunnerService, this.progressBarState);
    this.runnerService = new RunnerService(this.runnerServiceData);
    this.addClass(progressBarState.orientation, progressBarState.progressBar);
    this.addElems();
    this.setStyle(this.progressBarState);
  }

  public update(progressBarState: IProgressBar): void {
    this.setStyle(progressBarState);
    this.updateRunnerService(progressBarState);
    if (this.isOrientationChanged(progressBarState.orientation)
      || this.isProgressChanged(progressBarState.progressBar)) {
      this.addClass(progressBarState.orientation, progressBarState.progressBar);
    }
    if (this.isChildrenChanged(this.runnerService.getTemplate())) {
      this.removeElems();
      this.addElems();
    }
    this.progressBarState = copyObject(progressBarState);
  }

  public getTemplate(): HTMLElement {
    return this.progressBar;
  }

  private updateRunnerService(progressBarState: IProgressBar) {
    this.runnerServiceData = setType(InterfacesNames.IRunnerService, progressBarState);
    this.runnerService.update(this.runnerServiceData);
  }

  private setStyle(progressBarState: IProgressBar): void {
    if (progressBarState.orientation === Orientation.VERTICAL) {
      this.progressBar.style.left = `${0}%`;
      this.progressBar.style.width = `${8}px`;
      this.progressBar.style.height = `${this.getSize(progressBarState)}%`;

      if (progressBarState.range === false) {
        this.progressBar.style.top = `${0}%`;
        return;
      }
      this.progressBar.style.top = `${this.getOffset(progressBarState)}%`;
      return;
    }

    this.progressBar.style.top = `${0}%`;
    this.progressBar.style.height = `${8}px`;
    this.progressBar.style.width = `${this.getSize(progressBarState)}%`;

    if (progressBarState.range === false) {
      this.progressBar.style.left = `${0}%`;
      return;
    }

    this.progressBar.style.left = `${this.getOffset(progressBarState)}%`;
  }

  private getOffset(progressBarState: IProgressBar): number {
    const { max, min, value } = progressBarState;
    const firstValue = value[0];
    const all = max - min;
    const second = max - firstValue;
    const secondOffset = (second / all) * 100;
    const firstOffset = 100 - secondOffset;
    return firstOffset;
  }

  private getSize(progressBarState: IProgressBar): number {
    const { min, max, value } = progressBarState;
    const all = max - min;

    if (progressBarState.range) {
      const rangeValue = value[1] - value[0];
      const size = ((rangeValue / all) * 100);
      return size;
    }

    const rightSide = Math.abs(max - value[1]);
    const size = ((all - rightSide) / all) * 100;

    return size;
  }

  private addElems(): void {
    this.runnerService.getTemplate().forEach((runner) => {
      this.progressBar.append(runner);
    });
  }

  private removeElems(): void {
    this.progressBar.innerHTML = '';
  }

  private addClass(orientation: Orientation, progressBar: boolean): void {
    this.progressBar.className = '';
    this.progressBar.classList.add(Classes.sliderActiveLine);
    this.updateOrientationClass(orientation);
    this.updateProgressClass(progressBar);
  }

  private updateOrientationClass(orientation: Orientation): void {
    if (orientation === Orientation.VERTICAL) {
      this.progressBar.classList.add(Classes.sliderActiveLineVertical);
      return;
    }
    this.progressBar.classList.add(Classes.sliderActiveLineHorizontal);
  }

  private updateProgressClass(progressBar: boolean): void {
    if (!progressBar) {
      this.progressBar.classList.add(Classes.sliderActiveLineTransparent);
    }
  }

  private isOrientationChanged(orientation: Orientation): boolean {
    return this.progressBarState.orientation !== orientation;
  }

  private isProgressChanged(progressBar: boolean): boolean {
    return this.progressBarState.progressBar !== progressBar;
  }

  private isChildrenChanged(children: HTMLElement[]): boolean {
    return this.progressBar.childElementCount !== children.length;
  }
}

export default ProgressBar;
