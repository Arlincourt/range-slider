import Orientation from '../../types/orientation';
import { IState, IOptions, IEmit } from '../../types/interfaces';
import copyObject from '../../helpers/copyObject';
import getSymbols from '../../helpers/getSymbols';
import Observer from '../../Observer/Observer';

interface ISetTwoPosition {
  emitData: IEmit;
  percentValue: number;
  valueInNumber: number;
  integerValue: number;
}

class Model {
  public observer?: Observer;

  private previousChangeableValue: number = 1

  private callback?: (state: IState) => Record<string, unknown>

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
    this.updateValues();
  }

  get getMin(): number {
    return this.state.min;
  }

  get getMax(): number {
    return this.state.max;
  }

  get getStep(): number {
    return this.state.step;
  }

  get getFirstValue(): number {
    return this.state.value[0];
  }

  get getSecondValue(): number {
    return this.state.value[1];
  }

  get getOrientation(): string {
    return this.state.orientation;
  }

  get getTips(): boolean {
    return this.state.tips;
  }

  get getRange(): boolean {
    return this.state.range;
  }

  public setOnChangeMethod(callback: () => Record<string, unknown>): void {
    this.callback = callback;
  }

  public getState(): IState {
    return copyObject(this.state);
  }

  public update(emitData: IEmit): void {
    this.setPosition(emitData);
    this.emitChanges();
  }

  public setMin(min: number | string): void {
    if (min < this.state.max) {
      this.state.min = Number(min);
      this.checkStepToValues()
      this.updateValues();
      this.emitChanges();
    }
  }

  public setMax(max: number | string): void {
    if (max > this.state.min) {
      this.state.max = Number(max);
      this.checkStepToValues()
      this.updateValues();
      this.emitChanges();
    }
  }

  public setOrientation(orientation: string): void {
    if (orientation === Orientation.HORIZONTAL) {
      this.state.orientation = Orientation.HORIZONTAL;
    } else if (orientation === Orientation.VERTICAL) {
      this.state.orientation = Orientation.VERTICAL;
      this.updateValues();
    }
    this.emitChanges();
  }

  public setTips(isTips: boolean): void {
    this.state.tips = isTips;
    this.emitChanges();
  }

  public setRange(isRange: boolean): void {
    this.state.range = isRange;
    if (!this.state.range) {
      this.state.value[0] = this.state.min;
    } else if (this.state.value[1] === this.state.value[0]) {
      this.state.value[1] = this.state.value[0] + this.state.step;
    }
    this.updateValues();
    this.emitChanges();
  }

  public setFirstValue(value: number | string): void {
    const { step } = this.state;
    let val = Number(value);
    if (val + step >= this.state.value[1]) {
      val = this.state.value[1] - this.state.step;
    }

    this.state.value[0] = Number(val.toFixed(getSymbols(step)));
    this.updateValues();
    this.emitChanges();
  }

  public setSecondValue(value: number): void {
    let val = Number(value);
    if (val <= this.state.value[0]) {
      val = this.state.value[0] + this.state.step;
    }

    this.state.value[1] = val;
    this.updateValues();
    this.emitChanges();
  }

  public setStep(step: number | string): void {
    this.state.step = Number(step);
    this.checkStepToValues()
    this.formatValuesToStep();
    this.updateValues();
    this.emitChanges();
  }
  
  private checkStepToValues(): void {
    const {max, min} = this.state
    if (this.state.step > (max - min)) {
      this.state.step = max
      return;
    } else if(this.state.step <= 0) {
      this.state.step = 1
    }
  }

  private formatValuesToStep(): void {
    const { min, step, value } = this.state;
    const differenceBetweenFirstValueAndMin = value[0] - min;
    const differenceBetweenSecondValueAndFirstValue = value[1] - value[0];
    if (differenceBetweenFirstValueAndMin > step) {
      const remains = differenceBetweenFirstValueAndMin % step;
      value[0] = Number((differenceBetweenFirstValueAndMin - remains).toFixed(getSymbols(step)));
    } else {
      value[0] = min;
    }

    if (differenceBetweenSecondValueAndFirstValue % step === 0) {
      this.updateValues();
      return;
    }

    const multiplier = this.getIntegerMultiplier(differenceBetweenSecondValueAndFirstValue);
    value[1] = value[0] + multiplier * step;
    this.updateValues();
  }

  private getIntegerMultiplier(value: number): number {
    return Math.ceil(value / this.state.step);
  }

  private updateValues(): void {
    this.checkValuesToMax();
    this.checkValuesToMin();
  }

  private checkValuesToMax(): void {
    if (this.state.value[1] > this.state.max) {
      this.state.value[1] = this.state.max;
    }
    if (this.state.value[0] > this.state.max) {
      this.state.value[0] = this.state.max;
    }
  }

  private checkValuesToMin(): void {
    if (this.state.value[0] < this.state.min) {
      this.state.value[0] = this.state.min;
    }
    if (this.state.value[1] < this.state.min) {
      this.state.value[1] = this.state.min;
    }
  }

  private setPosition(emitData: IEmit): void {
    const {
      min, step, range
    } = this.state;
    const percentValue: number = this.getValueInPercent(emitData);
    const valueInNumber: number = this.getValueInNumber(percentValue);
    const integerValue: number = min + Math.round((valueInNumber - min) / step) * step;
    
    if (range) {
      this.setTwoPosition({integerValue, valueInNumber, percentValue, emitData});
    } else {
      this.setOnePosition(integerValue, valueInNumber);
    }
  }

  private setTwoPosition(data: ISetTwoPosition): void {
    const {
      min, max, step, value,
    } = this.state;
    let {
      percentValue, emitData, valueInNumber, integerValue
    } = data

    const values = this.getValuesInPercent();
    const closestPosition = this.getClosestPosition(percentValue, values);
    
    if(this.isLastPosition(integerValue, valueInNumber, closestPosition)) {
      value[0] = max; 
      return;
    }

    if (emitData.mouseDown) {
      this.previousChangeableValue = closestPosition;
    }

    if (this.previousChangeableValue !== closestPosition) {
      value[this.previousChangeableValue] = value[closestPosition]
      return;
    }

    if (valueInNumber >= max) {
      value[closestPosition] = max;
      this.updateValues();
      return;
    } else if (valueInNumber <= min) {
      value[closestPosition] = min;
      this.updateValues();
      return;
    }

    value[closestPosition] = Number(integerValue.toFixed(getSymbols(step)));
    this.updateValues();
  }

  private setOnePosition(integerValue: number, valueInNumber: number): void {
    const {
      max, min, step, value,
    } = this.state;
    

    value[1] = Number(integerValue.toFixed(getSymbols(step)));
    if (valueInNumber >= max) {
      value[1] = max;
    }
    if (valueInNumber <= min) {
      value[1] = min;
    }
  }

  private getValueInNumber(value: number): number {
    if (value <= 0) {
      return this.state.min;
    }

    if (value > 100 || value === 100) {
      return this.state.max;
    }
    const valueNumber = this.state.min + ((this.state.max - this.state.min) / 100) * value;
    return valueNumber;
  }

  private getValueInPercent(state: IEmit): number {
    let value: number;
    if (this.state.orientation === Orientation.HORIZONTAL) {
      value = state.clientX - state.offsetX;
      value = (value / state.clientWidth) * 100;
      return value;
    }
    value = state.clientY - state.offsetY;
    value = (value / state.clientHeight) * 100;
    return value;
  }

  private getValuesInPercent(): number[] {
    const all = this.state.max - this.state.min;
    const firstValue = this.state.value[0] - this.state.min;
    const secondValue = this.state.value[1] - this.state.min;
    const firstValuePercent = Math.abs((firstValue / all) * 100);
    const secondValuePercent = Math.abs((secondValue / all) * 100);

    return [firstValuePercent, secondValuePercent];
  }

  private getClosestPosition(value: number, values: number[]): number {
    const firstValue = Math.abs(value - values[0]);
    const secondValue = Math.abs(value - values[1]);

    if (secondValue < firstValue) {
      return 1;
    } else if (values[0] === values[1]) {
      const result = value > values[1] ? 1 : 0
      return result
    }
    return 0;
  }

  private isLastPosition(integerValue: number, valueInNumber: number, closestPosition: number): boolean {
    const {min, max, step} = this.state
    const halfIntegerValue: number = min + Math.round((valueInNumber - min) / (step / 2)) * (step / 2);
    const isLastPosition = (integerValue + step) >= max
    const isHalfPosition = (integerValue + step / 2) === halfIntegerValue
    const isFirstCurrent = closestPosition === 0

    if(isLastPosition && isHalfPosition && isFirstCurrent) {
      return true
    }

    return false 
  }

  private emitChanges(): void {
    if (this.callback) {
      this.callback({ ...this.state });
    }
    this.observer?.emit('modelChange');
  }
}

export default Model;
