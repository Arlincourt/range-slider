import { IState, IOptions, IEmit } from '../../types/interfaces';
import Observer from '../../Observer/Observer';
import Orientation from '../../types/orientation';
import copyObject from '../../helpers/copyObject';
import getSymbols from '../../helpers/getSymbols';

class Model {
  public observer?: Observer;

  private previousChangeableValue: number = 1

  private callback?: (state: IState) => {}

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
    return this.state.min
  }
  get getMax(): number {
    return this.state.max
  }
  get getStep(): number {
    return this.state.step
  }
  get getFirstValue(): number {
    return this.state.value[0]
  }
  get getSecondValue(): number {
    return this.state.value[1]
  }
  get getOrientation(): string {
    return this.state.orientation
  }
  get getTips(): boolean {
    return this.state.tips
  }
  get getRange(): boolean {
    return this.state.range
  }

  public setOnChangeMethod(callback: () => {}): void {
    this.callback = callback
  }

  public getState(): IState {
    return copyObject(this.state);
  }

  public update(emitData: IEmit) {
    this.setPosition(emitData);
    this.emitChanges();
  }

  public setMin(min: number | string): void {
    if (min < this.state.max) {
      this.state.min = Number(min);
      this.updateValues();
      this.emitChanges();
    }
  }

  public setMax(max: number | string): void {
    if (max > this.state.min) {
      this.state.max = Number(max);
      this.updateValues();
      this.emitChanges();
    }
  }

  public setOrientation(orientation: string): void {
    if (orientation === Orientation.HORIZONTAL) {
      this.state.orientation = Orientation.HORIZONTAL;
      this.emitChanges();
      return;
    } else if(orientation === Orientation.VERTICAL) {
      this.state.orientation = Orientation.VERTICAL;
      this.updateValues();
      this.emitChanges();
    }
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
    const { min, max, step } = this.state;
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
    if (step <= 0) {
      return;
    }
    this.state.step = Number(step);
    this.formatValuesToStep();
    this.updateValues();
    this.emitChanges();
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
    const { value, range, min } = this.state;
    this.checkValuesToMax();
    this.checkValuesToMin();
    if (range) {
      this.checkValuesToRange();
    } else if (value[1] < min) {
      value[1] = min;
    }
    this.checkValuesToMax();
    this.checkValuesToMin();
  }

  private checkValuesToRange(): void {
    const {
      value, step, min, max,
    } = this.state;
    const isMaxMore = max > value[0] + step;
    const firstValueWithStep = value[0] + step;
    const isMinLess = min < value[1] - step;

    if (value[1] <= firstValueWithStep && isMinLess) {
      value[0] = value[1] - step;
    } else if (value[1] <= firstValueWithStep && isMaxMore) {
      value[1] = value[0] + step;
    }
  }

  private checkValuesToMax(): void {
    if (this.state.value[1] > this.state.max) {
      this.state.value[1] = this.state.max;
    }
    if (this.state.value[0] > this.state.max) {
      this.state.value[0] = this.state.value[1] - this.state.step;
    }
  }

  private checkValuesToMin(): void {
    if (this.state.value[0] < this.state.min) {
      this.state.value[0] = this.state.min;
    }
    if (this.state.value[1] < this.state.min) {
      this.state.value[1] = this.state.min + this.state.step;
    }
  }

  private setPosition(emitData: IEmit): void {
    const { range } = this.state;
    if (range) {
      this.setTwoPosition(emitData);
    } else {
      this.setOnePosition(emitData);
    }
  }

  private setTwoPosition(emitData: IEmit): void {
    const {
      min, max, step, value,
    } = this.state;
    const percentValue: number = this.getValueInPercent(emitData);
    const valueInNumber: number = this.getValueInNumber(percentValue);
    const integerValue: number = min + Math.round((valueInNumber - min) / step) * step;

    const values = this.getValuesInPercent();
    const closestPosition = this.getclosestPosition(percentValue, values);

    if (emitData.mouseDown) {
      this.previousChangeableValue = closestPosition;
    }

    if (this.previousChangeableValue !== closestPosition) {
      const isFirst = this.previousChangeableValue === 0;
      if (isFirst) {
        value[this.previousChangeableValue] = Number((value[closestPosition] - step).toFixed(getSymbols(step)));
      } else {
        value[this.previousChangeableValue] = Number((value[closestPosition] + step).toFixed(getSymbols(step)));
      }
      this.updateValues();
      return;
    }

    const isSameValues = Math.round(valueInNumber) === integerValue;
    const isMoreThanStep = integerValue - value[0] >= step;

    if (isSameValues && isMoreThanStep) {
      value[closestPosition] = Number(integerValue.toFixed(getSymbols(step)));
      this.updateValues();
      return;
    }

    if (valueInNumber >= max) {
      value[closestPosition] = max;
      this.updateValues();
      return;
    } if (valueInNumber <= min) {
      value[closestPosition] = min;
      this.updateValues();
      return;
    }

    const differenceBetweenValueAndFutureValue = Math.abs(value[closestPosition] - integerValue);
    if (differenceBetweenValueAndFutureValue < step) {
      return;
    }

    this.previousChangeableValue = closestPosition;
    value[closestPosition] = Number(integerValue.toFixed(getSymbols(step)));
    this.updateValues();
  }

  private setOnePosition(emitData: IEmit): void {
    const {
      max, min, step, value,
    } = this.state;
    const percentValue: number = this.getValueInPercent(emitData);
    const valueInNumber: number = this.getValueInNumber(percentValue);
    const differenceBetweenLastPositionAndNewPosition = Math.abs(value[1] - valueInNumber);
    const integerValue: number = min + Math.round((valueInNumber - min) / step) * step;

    if (Math.round(valueInNumber) === integerValue) {
      value[1] = Number(integerValue.toFixed(getSymbols(step)));
    }

    if (valueInNumber >= max) {
      value[1] = max;
    }
    if (valueInNumber <= min) {
      value[1] = min;
    }

    if (differenceBetweenLastPositionAndNewPosition > step / 2) {
      value[1] = Number(integerValue.toFixed(getSymbols(step)));
    }
    this.updateValues();
  }

  private getValueInNumber(value: number): number {
    if (value <= 0) {
      return this.state.min;
    }

    if (value >= 100) {
      return this.state.max;
    }
    const valueNumber = this.state.min + (this.state.max - this.state.min) / 100 * value;
    return valueNumber;
  }

  private getValueInPercent(state: IEmit): number {
    let value: number;
    if (this.state.orientation === Orientation.HORIZONTAL) {
      value = state.clientX - state.offsetX;
      value = Number((value / state.clientWidth * 100).toFixed(2));
      return value;
    }
    value = state.clientY - state.offsetY;
    value = Number((value / state.clientHeight * 100).toFixed(2));
    return value;
  }

  private getValuesInPercent(): number[] {
    const all = this.state.max - this.state.min;
    const firstValue = this.state.value[0] - this.state.min;
    const secondValue = this.state.value[1] - this.state.min;
    const firstValuePercent = Math.abs(firstValue / all * 100);
    const secondValuePercent = Math.abs(secondValue / all * 100);

    return [firstValuePercent, secondValuePercent];
  }

  private getclosestPosition(value: number, values: number[]): number {
    const firstValue = Math.abs(value - values[0]);
    const secondValue = Math.abs(value - values[1]);

    if (secondValue < firstValue) {
      return 1;
    }
    return 0;
  }

  private emitChanges(): void {
    if(this.callback) {
      this.callback({...this.state})
    }
    this.observer?.emit('modelChange');
  }
}

export default Model;
