import Orientation from '../../types/orientation';
import { IState, IOptions, IEmit, IEmitEdge, IPossibleValues } from '../../types/interfaces';
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
    possibleValues: {},
    progressBar: true
  };

  constructor(options: IOptions) {
    this.state = copyObject({ ...this.state, ...options });
    this.updateValues();
    this.setPossibleValues()
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

  get getProgress(): boolean {
    return this.state.progressBar;
  }

  get getPossibleValues(): IPossibleValues {
    return this.state.possibleValues;
  }

  public setOnChangeMethod(callback: () => Record<string, unknown>): void {
    this.callback = callback;
  }

  public getState(): IState {
    return copyObject(this.state);
  }

  public update(emitData: IEmit): void {
    this.setPosition(emitData);
    this.setPossibleValues()
    this.emitChanges();
  }

  public setMin(min: number | string): void {
    if (min < this.state.max) {
      this.state.min = Number(min);
      this.checkStepToValues()
      this.updateValues();
      this.setPossibleValues()
      this.emitChanges();
    }
  }

  public setMax(max: number | string): void {
    if (max > this.state.min) {
      this.state.max = Number(max);
      this.checkStepToValues()
      this.updateValues();
      this.setPossibleValues()
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
    }
    this.updateValues();
    this.emitChanges();
  }

  public setFirstValue(value: number | string): void {
    const { step } = this.state;
    let val = Number(value);
    this.state.value[0] = Number(val.toFixed(getSymbols(step)));
    this.isSame(0)
    this.updateValues();
    this.emitChanges();
  }

  public setSecondValue(value: number): void {
    const { step } = this.state;
    let val = Number(value);
    this.state.value[1] = Number(val.toFixed(getSymbols(step)));
    this.isSame(1)
    this.updateValues();
    this.emitChanges();
  }

  public setStep(step: number | string): void {
    this.state.step = Number(step);
    this.checkStepToValues()
    this.state.value[0] = this.formatToStep(this.state.value[0]);
    this.state.value[1] = this.formatToStep(this.state.value[1]);
    this.updateValues();
    this.setPossibleValues()
    this.emitChanges();
  }

  public setProgress(isProgress: boolean): void {
    this.state.progressBar = isProgress;
    this.emitChanges();
  }

  private setPossibleValues(): void {
    const {min, max} = this.state 
    this.state.possibleValues = {}
    const numberOfValidValues = this.getNumberOfValidValues()
    const all = this.getAll()
    this.state.possibleValues[min] = 0
    for(let i = 1; i <= numberOfValidValues; i++) {
      let key = min + (Math.floor(all / numberOfValidValues) * i)
      key = this.formatToStep(key)
      const value = this.getValueInPercent(key)
      this.state.possibleValues[key] = value
    }
    this.state.possibleValues[max] = 100
  }

  private getNumberOfValidValues(): number {
    const {step} = this.state 
    let numberOfValidValues = this.getAll() / step
    const roundedNumber = Math.floor(numberOfValidValues)
    if(numberOfValidValues <= 1) {
      return 0 
    } else if(numberOfValidValues >= 8) {
      return this.divideToInteger(roundedNumber)
    } else if(Number.isInteger(numberOfValidValues)) {
      return numberOfValidValues - 1
    }
    return Math.floor(numberOfValidValues)
  }

  private divideToInteger(value: number): number {
    for(let i = 2; i < value; i++) {
      const result = value / i
      if(result < 7) {
        return Math.floor(result)
      }
    }
    return 1
  }

  private formatToStep(value: number): number {
    const {min, step} = this.state
    let result = value
    const difference = value - min
    const divideRemaining = difference % step
    const prevPossibleValue = Math.floor(difference / step)
    const nextPossibleValue = Math.ceil(difference / step)

    if(divideRemaining >= 5) {
      result = min + (step * nextPossibleValue)
    } else {
      result = min + (step * prevPossibleValue)
    }
    return Number(result.toFixed(getSymbols(step)))
  }

  private getAll(): number {
    return this.state.max - this.state.min
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
    const percentValue: number = this.getCoorInPercent(emitData);
    const valueInNumber: number = this.getValueInNumber(percentValue);
    let integerValue: number = min + Math.round((valueInNumber - min) / step) * step;
    integerValue = (emitData as IEmitEdge).value !== undefined ? (emitData as IEmitEdge).value : integerValue

    if (range) {
      this.setTwoPosition({integerValue, valueInNumber, percentValue, emitData});
    } else {
      this.setOnePosition(integerValue, valueInNumber, (emitData as IEmitEdge).value);
    }
  }

  private setTwoPosition(data: ISetTwoPosition): void {
    const {
      min, max, step, value,
    } = this.state;
    let {
      percentValue, emitData, valueInNumber, integerValue
    } = data

    const values = [this.getValueInPercent(value[0]), this.getValueInPercent(value[1])];

    if (emitData.mouseDown) {
      this.previousChangeableValue = this.getClosestPosition(percentValue, values);
    }
    integerValue = this.checkValueToEdge((emitData as IEmitEdge).value, integerValue)
    integerValue = this.checkValueToLimits(valueInNumber, integerValue)

    value[this.previousChangeableValue] = integerValue;
    this.isSame(this.previousChangeableValue)
    this.updateValues();
    return;
  }

  private setOnePosition(integerValue: number, valueInNumber: number, edge: number | undefined): void {
    const {
      step, value,
    } = this.state;
    integerValue = this.checkValueToEdge(edge, integerValue)
    integerValue = this.checkValueToLimits(valueInNumber, integerValue)
    value[1] = integerValue
  }

  private checkValueToEdge(edge: number | undefined, integerValue: number): number {
    if(edge === undefined) {
      return Number(integerValue.toFixed(getSymbols(this.state.step)));
    }
    return integerValue
  }

  private checkValueToLimits(valueInNumber: number, integerValue: number): number {
    const {max, min} = this.state 
    if(valueInNumber >= max) {
      return max
    } else if(valueInNumber <= min) {
      return min 
    }
    return integerValue
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

  private getCoorInPercent(state: IEmit): number {
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

  private getValueInPercent(value: number): number {
    const {max, min} = this.state 
    const all = max - min;
    const differentValue = value - min;
    const valueInPercent = Math.abs((differentValue / all) * 100);
    return valueInPercent
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

  private isSame(closestPosition: number): void {
    const {value} = this.state 
    const isFirst = closestPosition === 0 ? true : false 
    if (isFirst) {
      value[closestPosition] = value[closestPosition] > value[1] ? value[1] : value[closestPosition]
      return
    } 
    value[closestPosition] = value[closestPosition] < value[0] ? value[0] : value[closestPosition]
  }

  private emitChanges(): void {
    if (this.callback) {
      this.callback({ ...this.state });
    }
    this.observer?.emit('modelChange');
  }
}

export default Model;
