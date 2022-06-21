import Orientation from '../../../types/orientation';
import classes from '../../../types/classes';
import { ICombinedTip } from '../../../types/interfaces';

class CombinedTip {
  private _combinedTip: HTMLElement = document.createElement('div');

  private _combinedTipState: ICombinedTip;

  constructor(combinedTipState: ICombinedTip) {
    this._combinedTipState = { ...combinedTipState };
    this._addClass(this._combinedTipState.orientation);
    this._setText(this._combinedTipState.value);
  }

  public update(combinedTipState: ICombinedTip): void {
    if (this._isOrientationChanged(combinedTipState.orientation)) {
      this._addClass(combinedTipState.orientation);
    }
    this._combinedTipState = { ...combinedTipState };
    this._setText(this._combinedTipState.value);
  }

  public getTemplate = (): HTMLElement => this._combinedTip;

  private _addClass(orientation: Orientation): void {
    this._combinedTip.className = '';
    this._combinedTip.classList.add(classes.sliderCombinedTip);
    if (orientation === Orientation.VERTICAL) {
      this._combinedTip.classList.add(classes.sliderCombinedTipVertical);
      return;
    }
    this._combinedTip.classList.add(classes.sliderCombinedTipHorizontal);
  }

  private _setText(text: number[]): void {
    const value = text[0] === text[1] ? [text[0]] : text;
    this._combinedTip.textContent = value.join(' - ');
  }

  private _isOrientationChanged(orientation: Orientation): boolean {
    return this._combinedTipState.orientation !== orientation;
  }
}

export default CombinedTip;
