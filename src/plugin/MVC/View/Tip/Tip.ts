import classes from '../../../types/classes'

class Tip {
  private tip: HTMLElement = document.createElement('div')

  constructor() {
    this.init()
  }
  
  public update(text: number): void {
    this.setText(text)
  }

  public remove(): void {
    this.tip.remove()
  }

  private init(): void {
    this.addClass()
  }

  private addClass(): void {
    this.tip.className = ''
    this.tip.classList.add(classes.sliderTip)
  }

  private setText(text: number): void {
    this.tip.textContent = String(text)
  }

  public getTemplate(): HTMLElement {
    return this.tip
  }
}

export default Tip