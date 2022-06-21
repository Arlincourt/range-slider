import Orientation from '../../types/orientation';
import {
  IState, IOptions, IEmit, IEmitEdge, IPossibleValues,
} from '../../types/interfaces';
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

  private _previousChangeableValue: number = 1;

  private _callback?: (state: IState) => Record<string, unknown>;

  private _state: IState = {
    range: false,
    tips: true,
    max: 100,
    min: 0,
    orientation: Orientation.HORIZONTAL,
    step: 1,
    value: [0, 100],
    possibleValues: {},
    progressBar: true,
    scale: true,
  };

  constructor(options: IOptions) {
    this._state = { ...this._state, ...options };
    this._updateValues();
    this._setPossibleValues();
  }

  public update(emitData: IEmit | IEmitEdge): void {
    this._setPosition(emitData);
    this._setPossibleValues();
    this._emitChanges();
  }

  public setOnChangeMethod(callback: () => Record<string, unknown>): void {
    this._callback = callback;
  }

  public getState = (): IState => ({ ...this._state });

  public setMin(min: number | string): void {
    if (min < this._state.max) {
      this._state.min = Number(min);
      this._checkStepToValues();
      this._updateValues();
      this._setPossibleValues();
    }
    this._emitChanges();
  }

  public setMax(max: number | string): void {
    if (max > this._state.min) {
      this._state.max = Number(max);
      this._checkStepToValues();
      this._updateValues();
      this._setPossibleValues();
    }
    this._emitChanges();
  }

  public setOrientation(orientation: string): void {
    if (orientation === Orientation.HORIZONTAL) {
      this._state.orientation = Orientation.HORIZONTAL;
    } else if (orientation === Orientation.VERTICAL) {
      this._state.orientation = Orientation.VERTICAL;
      this._updateValues();
    }
    this._emitChanges();
  }

  public setTips(isTips: boolean): void {
    this._state.tips = isTips;
    this._emitChanges();
  }

  public setScale(isScale: boolean): void {
    this._state.scale = isScale;
    this._emitChanges();
  }

  public setRange(isRange: boolean): void {
    this._state.range = isRange;
    this._isSame(0);
    this._updateValues();
    this._emitChanges();
  }

  public setFirstValue(value: number | string): void {
    const val = Number(value);
    this._state.value[0] = this._formatToStep(val);
    this._isSame(0);
    this._updateValues();
    this._emitChanges();
  }

  public setSecondValue(value: number): void {
    const val = Number(value);
    this._state.value[1] = this._formatToStep(val);
    if (this._state.range) {
      this._isSame(1);
    }
    this._updateValues();
    this._emitChanges();
  }

  public setStep(step: number | string = 0): void {
    this._state.step = Number(step);
    this._checkStepToValues();
    this._state.value[0] = this._formatToStep(this._state.value[0]);
    this._state.value[1] = this._formatToStep(this._state.value[1]);
    this._updateValues();
    this._setPossibleValues();
    this._emitChanges();
  }

  public setProgress(isProgress: boolean): void {
    this._state.progressBar = isProgress;
    this._emitChanges();
  }

  get getMin(): number {
    return this._state.min;
  }

  get getMax(): number {
    return this._state.max;
  }

  get getStep(): number {
    return this._state.step;
  }

  get getFirstValue(): number {
    return this._state.value[0];
  }

  get getSecondValue(): number {
    return this._state.value[1];
  }

  get getOrientation(): string {
    return this._state.orientation;
  }

  get getTips(): boolean {
    return this._state.tips;
  }

  get getRange(): boolean {
    return this._state.range;
  }

  get getProgress(): boolean {
    return this._state.progressBar;
  }

  get getPossibleValues(): IPossibleValues {
    return this._state.possibleValues;
  }

  private _setPossibleValues(): void {
    const { min, max } = this._state;
    this._state.possibleValues = {};
    const numberOfValidValues = this._getNumberOfValidValues();
    const all = this._getAll();
    this._state.possibleValues[min] = 0;
    this._state.possibleValues[max] = 100;
    for (let i = 1; i <= numberOfValidValues; i += 1) {
      let key = min + (Math.floor(all / numberOfValidValues) * i);
      key = this._formatToStep(key);
      const value = this._getValueInPercent(key);
      if (value + 10 > 100) {
        return;
      }
      this._state.possibleValues[key] = value;
    }
  }

  private _getNumberOfValidValues(): number {
    const { step } = this._state;
    const numberOfValidValues = this._getAll() / step;
    const roundedNumber = Math.floor(numberOfValidValues);
    if (numberOfValidValues <= 1) {
      return 0;
    } if (numberOfValidValues >= 8) {
      return this._divideToInteger(roundedNumber);
    } if (Number.isInteger(numberOfValidValues)) {
      return numberOfValidValues - 1;
    }
    return Math.floor(numberOfValidValues);
  }

  private _divideToInteger(value: number): number {
    for (let i = 2; i < value; i += 1) {
      const result = value / i;
      if (result < 7) {
        return Math.floor(result);
      }
    }
    return 1;
  }

  private _formatToStep(value: number): number {
    const { min, max, step } = this._state;
    let result = value;
    const difference = value - min;
    const divideRemaining = difference % step;
    const prevPossibleValue = Math.floor(difference / step);
    const nextPossibleValue = Math.ceil(difference / step);

    if (value >= max) {
      result = max;
    } else if (value <= min) {
      result = min;
    } else if (divideRemaining >= 5) {
      result = min + (step * nextPossibleValue);
    } else {
      result = min + (step * prevPossibleValue);
    }
    return Number(result.toFixed(getSymbols(step)));
  }

  private _getAll = (): number => this._state.max - this._state.min;

  private _checkStepToValues(): void {
    const { max, min } = this._state;
    if (this._state.step > (max - min)) {
      this._state.step = max;
    } else if (this._state.step <= 0) {
      this._state.step = 1;
    }
  }

  private _updateValues(): void {
    this._checkValuesToMax();
    this._checkValuesToMin();
  }

  private _checkValuesToMax(): void {
    if (this._state.value[1] > this._state.max) {
      this._state.value[1] = this._state.max;
    }
    if (this._state.value[0] > this._state.max) {
      this._state.value[0] = this._state.max;
    }
  }

  private _checkValuesToMin(): void {
    if (this._state.value[0] < this._state.min) {
      this._state.value[0] = this._state.min;
    }
    if (this._state.value[1] < this._state.min) {
      this._state.value[1] = this._state.min;
    }
  }

  private _setPosition(emitData: IEmit | IEmitEdge): void {
    const {
      min, max, step, range,
    } = this._state;
    
    const percentValue: number = emitData.value;
    const valueInNumber: number = this._getValueInNumber(percentValue);
    let integerValue: number = min + Math.round((valueInNumber - min) / step) * step;
    const nextRemains = max - valueInNumber;
    const prevRemains = valueInNumber - integerValue;
    if (nextRemains < prevRemains) {
      integerValue = max;
    }

    integerValue = (emitData as IEmitEdge).edge !== undefined
      ? (emitData as IEmitEdge).edge
      : integerValue;
    if (range) {
      this._setTwoPosition({
        integerValue, valueInNumber, percentValue, emitData,
      });
    } else {
      this._setOnePosition(integerValue, valueInNumber, (emitData as IEmitEdge).value);
    }
  }

  private _setTwoPosition(data: ISetTwoPosition): void {
    const { value } = this._state;
    const {
      percentValue, emitData, valueInNumber,
    } = data;
    let { integerValue } = data;

    const values = [this._getValueInPercent(value[0]), this._getValueInPercent(value[1])];

    if (emitData.mouseDown) {
      this._previousChangeableValue = this._getClosestPosition(percentValue, values);
    }
    integerValue = this._checkValueToEdge((emitData as IEmitEdge).value, integerValue);
    integerValue = this._checkValueToLimits(valueInNumber, integerValue);

    value[this._previousChangeableValue] = integerValue;
    this._isSame(this._previousChangeableValue);
    this._updateValues();
  }

  private _setOnePosition(
    integerValue: number, valueInNumber: number, edge: number | undefined,
  ): void {
    const {
      value, range,
    } = this._state;
    value[1] = this._checkValueToEdge(edge, integerValue);
    value[1] = this._checkValueToLimits(valueInNumber, integerValue);
    const isMore = value[0] > value[1];
    if (isMore && range) {
      value[0] = value[1] - this._state.step;
    }
    this._checkValuesToMin();
  }

  private _checkValueToEdge(edge: number | undefined, integerValue: number): number {
    if (edge === undefined) {
      return Number(integerValue.toFixed(getSymbols(this._state.step)));
    }
    return integerValue;
  }

  private _checkValueToLimits(valueInNumber: number, integerValue: number): number {
    const { max, min } = this._state;
    if (valueInNumber >= max) {
      return max;
    } if (valueInNumber <= min) {
      return min;
    }
    return integerValue;
  }

  private _getValueInNumber(value: number): number {
    if (value <= 0) {
      return this._state.min;
    }

    const isMore = value > 100;
    const isSame = value === 100;

    if (isMore || isSame) {
      return this._state.max;
    }
    const valueNumber = this._state.min + ((this._getAll()) / 100) * value;
    return valueNumber;
  }

  private _getValueInPercent(value: number): number {
    const { max, min } = this._state;
    const all = max - min;
    const differentValue = value - min;
    const valueInPercent = Math.abs((differentValue / all) * 100);
    return valueInPercent;
  }

  private _getClosestPosition(value: number, values: number[]): number {
    const firstValue = Math.abs(value - values[0]);
    const secondValue = Math.abs(value - values[1]);

    if (secondValue < firstValue) {
      return 1;
    } if (values[0] === values[1]) {
      const result = value > values[1] ? 1 : 0;
      return result;
    }
    return 0;
  }

  private _isSame(closestPosition: number): void {
    const { value } = this._state;
    const isFirst = closestPosition === 0;
    if (isFirst) {
      value[closestPosition] = value[closestPosition] > value[1]
        ? value[1]
        : value[closestPosition];
      return;
    }
    value[closestPosition] = value[closestPosition] < value[0] ? value[0] : value[closestPosition];
  }

  private _emitChanges(): void {
    if (this._callback) {
      this._callback({ ...this._state });
    }
    this.observer?.emit('modelChange');
  }
}

export default Model;
