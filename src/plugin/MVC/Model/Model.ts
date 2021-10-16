import { IState, IOptions, IEmit } from '../../types/interfaces';
import Observer from '../../Observer/Observer';
import Orientation from '../../types/orientation';
import copyObject from '../../helpers/copyObject';

class Model {
  public observer?: Observer;

  private state: IState = {
    range: false,
    tips: true,
    max: 100,
    min: 0,
    orientation: Orientation.HORIZONTAL,
    step: 1,
    value: [0, 100],
  };

  constructor(options: IOptions) {
    this.state = copyObject({ ...this.state, ...options });
    
  }

  public getState(): IState {
    return this.state;
  }

  public update(emitData: IEmit) {
    this.setPosition(emitData)
  }

  public setMin(min: number): void {
    if(min < this.state.max) {
      this.state.min = min
    }
  }
  public setMax(): void {

  }
  public setRange(): void {

  }
  public setTips(): void {

  }
  public setOrientation(): void {

  }
  public setFirstValue(): void {

  }
  public setSecondValue(): void {

  }
  public setStep(): void {

  }

  private setPosition(emitData: IEmit): void {
    const value = this.getValueInPercent(emitData)
    if(this.state.range) {
      const values = this.getValuesInPercent()
      const getClosestValue = this.getClosestValue(value, values)
    }
    
  }

  private getValueInPercent(state: IEmit): number {
    let value: number
    if(this.state.orientation === Orientation.HORIZONTAL) {
      value = state.clientX - state.offsetX
      value = Number((value / state.clientWidth * 100).toFixed(2))
      return value
    }
    value = state.clientY - state.offsetY
    value = Number((value / state.clientHeight * 100).toFixed(2))
    return value
  }

  private getValuesInPercent(): number[] {

    const all = this.state.max - this.state.min
    const firstValue = this.state.value[0] - this.state.min
    const secondValue = this.state.value[1] - this.state.min
    const firstValuePercent = Math.abs(firstValue / all * 100)
    const secondValuePercent = Math.abs(secondValue / all * 100)

    return [firstValuePercent, secondValuePercent]
  }

  private getClosestValue(value: number, values: number[]): number {
    const firstValue = Math.abs(value - values[0])
    const secondValue = Math.abs(value - values[1])
    if(firstValue <= secondValue) {
      return 0
    } 
    return 1
  }

  private emitChanges(): void {
    this.observer?.emit('modelChange');
  }
}

export default Model;
