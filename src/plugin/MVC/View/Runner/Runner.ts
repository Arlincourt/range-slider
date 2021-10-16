import Tip from '../Tip/Tip';
import Point from '../Point/Point';
import { IRunner } from '../../../types/interfaces';
import isArraysEqual from '../../../helpers/isArraysEqual';

class Runner {
  private tip: Tip;

  private point: Point = new Point();

  private runner: HTMLElement = document.createElement('div')

  private runnerState: IRunner;

  constructor(options: IRunner) {
    this.runnerState = options;
    this.tip = new Tip(this.runnerState.value);
    this.init();
  }

  public getTemplate(): HTMLElement {
    return this.runner;
  }

  public update(newState: IRunner): void {
    if (!isArraysEqual(this.runnerState.classList, newState.classList)) {
      this.addClass(newState.classList);
    }
    this.runnerState = newState;
    this.setTipText(this.runnerState.value);
    this.removeElems();
    this.addTip();
  }

  private init(): void {
    this.addTip();
    this.addPoint();
    this.setTipText(this.runnerState.value);
    this.addClass(this.runnerState.classList);
  }

  private removeElems(): void {
    if (!this.runnerState.tips && this.runner.contains(this.tip.getTemplate())) {
      this.runner.removeChild(this.tip.getTemplate());
    }
  }

  private addTip(): void {
    if (this.isTip()) {
      this.runner.append(this.tip.getTemplate());
    }
  }

  private addPoint(): void {
    this.runner.append(this.point.getTemplate());
  }

  private addClass(classNames: string[]): void {
    this.runner.className = '';
    classNames.forEach((className) => {
      this.runner.classList.add(className);
    });
  }

  private setTipText(text: number): void {
    this.tip.update(text);
  }

  private isTip(): boolean {
    if (!this.runnerState.tips) {
      return false;
    }

    let isTip = true;
    isTip = !this.runner.contains(this.tip.getTemplate()) && isTip;
    return isTip;
  }
}

export default Runner;
