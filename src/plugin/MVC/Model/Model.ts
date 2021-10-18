import { IState, IOptions, IEmit } from '../../types/interfaces';
import Observer from '../../Observer/Observer';
import Orientation from '../../types/orientation';
import copyObject from '../../helpers/copyObject';

class Model {
  public observer?: Observer;

  private previousChangeableValue: number = 1

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
    this.emitChanges()
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
    const valueInNumber = this.getValueInNumber(value)
    const integerValue = this.state.min + Math.round((valueInNumber - this.state.min) / this.state.step) * this.state.step

    if(this.state.range) {
      const values = this.getValuesInPercent()
      const closestValue = this.getClosestValue(value, values)
      
      if(emitData.mouseDown) {
        this.previousChangeableValue = closestValue
      }
      
      const differenceBetweenValueAndFutureValue = Math.abs(this.state.value[closestValue] - integerValue)
      if(differenceBetweenValueAndFutureValue < this.state.step) {
        return
      }
      
      if(this.previousChangeableValue !== closestValue) {
        const isFirst = this.previousChangeableValue === 0 ? true : false 
        if(isFirst) {
          this.state.value[this.previousChangeableValue] = this.state.value[closestValue] - this.state.step
        } else {
          this.state.value[this.previousChangeableValue] = this.state.value[closestValue] + this.state.step
        }
        return
      }
      
      this.previousChangeableValue = closestValue
      this.state.value[closestValue] = integerValue
      return
    }

    const difference = Math.abs(this.state.value[1] - integerValue)
    if(difference < this.state.step) {
      return
    }
    this.state.value[1] = integerValue
  }

  private getValueInNumber(value: number): number {
    if(value <= 0) {
      return this.state.min
    }

    if(value >= 100) {
      return this.state.max
    }
    const valueNumber = this.state.min + (this.state.max - this.state.min) / 100 * value
    return valueNumber
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
    
    if(secondValue < firstValue) {
      return 1
    }
    return 0
  }

  private emitChanges(): void {
    this.observer?.emit('modelChange');
  }
}

export default Model;
