import classes from '../../../types/classes'

class Point {
  private point: HTMLElement = document.createElement('div')

  constructor() {
    this.init()
  }

  private init() {
    this.addClass()
  }

  private addClass(): void {
    this.point.className = ''
    this.point.classList.add(classes.sliderPoint)
  }

  public getTemplate(): HTMLElement {
    return this.point
  }
}

export default Point