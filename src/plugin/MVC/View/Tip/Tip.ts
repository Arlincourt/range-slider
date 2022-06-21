import classes from '../../../types/classes';

class Tip {
  private _tip: HTMLElement = document.createElement('div');

  constructor(text: number) {
    this._init();
    this._setText(text);
  }

  public update = (text: number): void => this._setText(text);

  public getTemplate = (): HTMLElement => this._tip;

  private _init = (): void => this._addClass();

  private _addClass = (): void => this._tip.classList.add(classes.sliderTip);

  private _setText(text: number): void {
    this._tip.textContent = String(text);
  }
}

export default Tip;
