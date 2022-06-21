import Classes from '../../../types/classes';
import InterfacesNames from '../../../types/interfacesNames';
import Orientation from '../../../types/orientation';
import { IRunnerService, IProgressBar } from '../../../types/interfaces';
import setType from '../../../helpers/setType';
import RunnerService from '../RunnerService/RunnerService';

class ProgressBar {
  private _progressBar: HTMLElement = document.createElement('div');

  private _progressBarState: IProgressBar;

  private _runnerService: RunnerService;

  private _runnerServiceData: IRunnerService;

  constructor(progressBarState: IProgressBar) {
    this._progressBarState = { ...progressBarState };
    this._runnerServiceData = setType(InterfacesNames.IRunnerService, this._progressBarState);
    this._runnerService = new RunnerService(this._runnerServiceData);
    this._addClass(progressBarState.orientation, progressBarState.progressBar);
    this._addElems();
    this._setStyle(this._progressBarState);
  }

  public update(progressBarState: IProgressBar): void {
    this._setStyle(progressBarState);
    this._updateRunnerService(progressBarState);
    if (this._isOrientationChanged(progressBarState.orientation)
      || this._isProgressChanged(progressBarState.progressBar)) {
      this._addClass(progressBarState.orientation, progressBarState.progressBar);
    }
    if (this._isChildrenChanged(this._runnerService.getTemplate())) {
      this._removeElems();
      this._addElems();
    }
    this._progressBarState = { ...progressBarState };
  }

  public getTemplate = (): HTMLElement => this._progressBar;

  private _updateRunnerService(progressBarState: IProgressBar) {
    this._runnerServiceData = setType(InterfacesNames.IRunnerService, progressBarState);
    this._runnerService.update(this._runnerServiceData);
  }

  private _setStyle(progressBarState: IProgressBar): void {
    if (progressBarState.orientation === Orientation.VERTICAL) {
      this._progressBar.style.left = `${0}%`;
      this._progressBar.style.width = `${8}px`;
      this._progressBar.style.height = `${this._getSize(progressBarState)}%`;

      if (progressBarState.range === false) {
        this._progressBar.style.top = `${0}%`;
        return;
      }
      this._progressBar.style.top = `${this._getOffset(progressBarState)}%`;
      return;
    }

    this._progressBar.style.top = `${0}%`;
    this._progressBar.style.height = `${8}px`;
    this._progressBar.style.width = `${this._getSize(progressBarState)}%`;

    if (progressBarState.range === false) {
      this._progressBar.style.left = `${0}%`;
      return;
    }

    this._progressBar.style.left = `${this._getOffset(progressBarState)}%`;
  }

  private _getOffset(progressBarState: IProgressBar): number {
    const { max, min, value } = progressBarState;
    const firstValue = value[0];
    const all = max - min;
    const second = max - firstValue;
    const secondOffset = (second / all) * 100;
    const firstOffset = 100 - secondOffset;
    return firstOffset;
  }

  private _getSize(progressBarState: IProgressBar): number {
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

  private _addElems(): void {
    this._runnerService.getTemplate().forEach((runner) => {
      this._progressBar.append(runner);
    });
  }

  private _removeElems(): void {
    this._progressBar.innerHTML = '';
  }

  private _addClass(orientation: Orientation, progressBar: boolean): void {
    this._progressBar.className = '';
    this._progressBar.classList.add(Classes.sliderActiveLine);
    this._updateOrientationClass(orientation);
    this._updateProgressClass(progressBar);
  }

  private _updateOrientationClass(orientation: Orientation): void {
    if (orientation === Orientation.VERTICAL) {
      this._progressBar.classList.add(Classes.sliderActiveLineVertical);
      return;
    }
    this._progressBar.classList.add(Classes.sliderActiveLineHorizontal);
  }

  private _updateProgressClass(progressBar: boolean): void {
    if (!progressBar) {
      this._progressBar.classList.add(Classes.sliderActiveLineTransparent);
    }
  }

  private _isOrientationChanged(orientation: Orientation): boolean {
    return this._progressBarState.orientation !== orientation;
  }

  private _isProgressChanged(progressBar: boolean): boolean {
    return this._progressBarState.progressBar !== progressBar;
  }

  private _isChildrenChanged(children: HTMLElement[]): boolean {
    return this._progressBar.childElementCount !== children.length;
  }
}

export default ProgressBar;
