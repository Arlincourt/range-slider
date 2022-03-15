import classes from '../../../types/classes';

class Point {
  private point: HTMLElement = document.createElement('div')

  constructor() {
    this.init();
  }

  public getTemplate = (): HTMLElement => this.point;
  
  private init(): void {
    this.addClass();
  }
  
  private addClass = (): void => this.point.classList.add(classes.sliderPoint);
}

export default Point;
