import classes from '../../../types/classes';

class Tip {
  private tip: HTMLElement = document.createElement('div')

  constructor(text: number) {
    this.init();
    this.setText(text);
  }

  public update = (text: number): void => this.setText(text);

  private init = (): void => this.addClass();

  private addClass = (): void => this.tip.classList.add(classes.sliderTip);

  private setText(text: number): void {
    this.tip.textContent = String(text);
  }

  public getTemplate = (): HTMLElement => this.tip;
}

export default Tip;
