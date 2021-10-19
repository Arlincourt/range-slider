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

  public setMin(min: number | string): void {
    if(min < this.state.max) {
      this.state.min = Number(min)
      this.updateValues()
      this.emitChanges()
    }
  }
  public setMax(max: number | string): void {
    if(max > this.state.min) {
      this.state.max = Number(max)
      this.updateValues()
      this.emitChanges()
    }
  }
  public setOrientation(orientation: boolean): void {
    if(orientation) {
      this.state.orientation = Orientation.HORIZONTAL
      this.emitChanges() 
      return 
    } 
    this.state.orientation = Orientation.VERTICAL
    this.updateValues()
    this.emitChanges()
  }
  public setTips(isTips: boolean): void {
    this.state.tips = isTips
    this.emitChanges()
  }
  public setRange(isRange: boolean): void {
    this.state.range = isRange
    if(!this.state.range) {
      this.state.value[0] = this.state.min
    } else if(this.state.value[1] === this.state.value[0]) {
      this.state.value[1] = this.state.value[0] + this.state.step
    }
    this.emitChanges()
  }
  public setFirstValue(value: number | string): void {
    let val = Number(value)
    if(val >= this.state.value[1]) {
      val = this.state.value[1] - this.state.step
    }

    if(this.isMatchingToStep(val)) {
      this.state.value[0] = val
    }
    this.updateValues()
    this.emitChanges()
  }
  public setSecondValue(value: number): void {
    let val = Number(value)
    if(val <= this.state.value[0]) {
      val = this.state.value[0] + this.state.step
    }
    if(this.isMatchingToStep(val)) {
      this.state.value[1] = val
    }
    this.updateValues()
    this.emitChanges()
  }
  public setStep(step: number | string): void {
    if(step <= 0) {
      return
    }
    this.state.step = Number(step) 
    this.formatValuesToStep()
    this.updateValues()
    this.emitChanges()
  }

  private formatValuesToStep(): void {
    const differenceBetweenFirstValueAndMin = this.state.value[0] - this.state.min
    const differenceBetweenSecondValueAndFirstValue = this.state.value[1] - this.state.value[0]
    if(differenceBetweenFirstValueAndMin > this.state.step) {
      const remains = differenceBetweenFirstValueAndMin % this.state.step
      this.state.value[0] = differenceBetweenFirstValueAndMin - remains
    } else {
     this.state.value[0] = this.state.min 
    }
    
    if(differenceBetweenSecondValueAndFirstValue % this.state.step === 0) {
      this.updateValues()
      return 
    }
    
    const multiplier = this.getIntegerMultiplier(differenceBetweenSecondValueAndFirstValue)
    this.state.value[1] = this.state.value[0] + multiplier * this.state.step
    this.updateValues()
  }

  private getIntegerMultiplier(value: number): number {
    return Math.ceil(value / this.state.step)
  }

  private updateValues(): void {
    this.checkValuesToMax()
    this.checkValuesToMin()
    if(this.state.value[0] >= this.state.value[1]) {
      this.state.value[1] = this.state.value[0] + this.state.step
    }
    this.checkValuesToMax()
    this.checkValuesToMin()
  }

  private checkValuesToMax(): void {
    if(this.state.value[1] > this.state.max) {
      this.state.value[1] = this.state.max 
    }
  }
  private checkValuesToMin(): void {
    if(this.state.value[0] < this.state.min) {
      this.state.value[0] = this.state.min
    }
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

      if(valueInNumber === this.state.max) {
        this.state.value[closestValue] = this.state.max
      } else if(valueInNumber === this.state.min) {
        this.state.value[closestValue] = this.state.min
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
        this.updateValues()
        return
      }
      
      this.previousChangeableValue = closestValue
      this.state.value[closestValue] = integerValue
      this.updateValues()
      return
    }

    const difference = Math.abs(this.state.value[1] - integerValue)
    if(difference < this.state.step) {
      return
    }
    this.state.value[1] = integerValue
    this.updateValues()
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

  private isMatchingToStep(value: number): boolean {
    if(value % this.state.step === 0) {
      return true 
    }
    return false
  }

  private emitChanges(): void {
    this.observer?.emit('modelChange');
  }
}

export default Model;
