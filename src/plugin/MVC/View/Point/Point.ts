import classes from '../../../types/classes';

class Point {
  private point: HTMLElement = document.createElement('div')

  constructor() {
    this.init();
  }

  private init(): void {
    this.addClass();
  }

  private addClass = (): void => this.point.classList.add(classes.sliderPoint);

  public getTemplate = (): HTMLElement => this.point;
}

export default Point;
