import classes from '../../../types/classes'

class Tip {
  private tip: HTMLElement = document.createElement('div')

  constructor() {
    this.init()
  }

  init(): void {
    this.addClass()
  }

  private addClass(): void {
    this.tip.className = ''
    this.tip.classList.add(classes.sliderTip)
  }

  private setText(text: string): void {
    this.tip.textContent = text
  }

  public getTemplate(): HTMLElement {
    return this.tip
  }

  private update(text: string): void {
    this.setText(text)
  }
}

export default Tip