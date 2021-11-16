import Orientation from '../../../types/orientation';
import classes from '../../../types/classes';
import {ICombinedTip} from '../../../types/interfaces'

class CombinedTip {
  private combinedTip: HTMLElement = document.createElement('div')
  private combinedTipState: ICombinedTip;

  constructor(combinedTipState: ICombinedTip) {
    this.combinedTipState = {...combinedTipState}
    this.addClass(this.combinedTipState.orientation)
    this.setText(this.combinedTipState.value);
  }
  
  public update(combinedTipState: ICombinedTip): void {
    if(this.isOrientationChanged(combinedTipState.orientation)) {
      this.addClass(combinedTipState.orientation)
    }
    this.combinedTipState = {...combinedTipState}
    this.setText(this.combinedTipState.value);
  }
  
  public getTemplate(): HTMLElement {
    return this.combinedTip;
  }

  private addClass(orientation: Orientation): void {
    this.combinedTip.className = ''
    this.combinedTip.classList.add(classes.sliderCombinedTip);
    if(orientation === Orientation.VERTICAL) {
      this.combinedTip.classList.add(classes.sliderCombinedTipVertical);
      return 
    } 
    this.combinedTip.classList.add(classes.sliderCombinedTipHorizontal);
  }

  private setText(text: number[]): void {
    const value = text[0] === text[1] ? [text[0]] : text;
    this.combinedTip.textContent = value.join(' - ')
  }

  private isOrientationChanged(orientation: Orientation): boolean {
    return this.combinedTipState.orientation !== orientation
  }
}

export default CombinedTip;