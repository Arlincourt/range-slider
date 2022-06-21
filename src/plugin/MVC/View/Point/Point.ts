import classes from '../../../types/classes';

class Point {
  private _point: HTMLElement = document.createElement('div');

  constructor() {
    this._init();
  }

  public getTemplate = (): HTMLElement => this._point;

  private _init(): void {
    this._addClass();
  }

  private _addClass = (): void => this._point.classList.add(classes.sliderPoint);
}

export default Point;
