import isArraysEqual from '../../../helpers/isArraysEqual';
import { IRunner } from '../../../types/interfaces';
import Point from '../Point/Point';
import Tip from '../Tip/Tip';

interface ITipSize {
  height: number;
  width: number;
  x: number;
  y: number;
}

class Runner {
  private _tip: Tip;

  private _point: Point = new Point();

  private _runner: HTMLElement = document.createElement('div');

  private _runnerState: IRunner;

  constructor(runnerState: IRunner) {
    this._runnerState = { ...runnerState };
    this._tip = new Tip(this._runnerState.value);
    this._init();
  }

  public update(runnerState: IRunner): void {
    if (!isArraysEqual(this._runnerState.classList, runnerState.classList)) {
      this._addClass(runnerState.classList);
    }
    this._runnerState = { ...runnerState };
    this._setTipText(this._runnerState.value);
    this._removeElems();
    this._addTip();
  }

  public getTemplate = (): HTMLElement => this._runner;

  get getTipSize(): ITipSize {
    const {
      width, height, x, y,
    } = this._tip.getTemplate().getBoundingClientRect();
    return {
      height,
      width,
      x,
      y,
    };
  }

  private _init(): void {
    this._addTip();
    this._addPoint();
    this._setTipText(this._runnerState.value);
    this._addClass(this._runnerState.classList);
  }

  private _removeElems(): void {
    if (!this._runnerState.tips && this._runner.contains(this._tip.getTemplate())) {
      this._runner.removeChild(this._tip.getTemplate());
    }
  }

  private _addTip(): void {
    if (this._isTip()) {
      this._runner.append(this._tip.getTemplate());
    }
  }

  private _addPoint = (): void => this._runner.append(this._point.getTemplate());

  private _addClass(classNames: string[]): void {
    this._runner.className = '';
    classNames.forEach((className) => {
      this._runner.classList.add(className);
    });
  }

  private _setTipText = (text: number): void => this._tip.update(text);

  private _isTip(): boolean {
    if (!this._runnerState.tips) {
      return false;
    }

    let isTip = true;
    isTip = !this._runner.contains(this._tip.getTemplate()) && isTip;
    return isTip;
  }
}

export default Runner;
