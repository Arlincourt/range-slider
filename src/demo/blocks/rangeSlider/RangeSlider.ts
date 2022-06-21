import { IState } from '../../../plugin/types/interfaces';
import Orientation from '../../../plugin/types/orientation';

interface IInputs {
  [key: string]: string;
}

class RangeSlider {
  private _inputs: IInputs = {
    'js-range-slider__min': 'setMin',
    'js-range-slider__max': 'setMax',
    'js-range-slider__step': 'setStep',
    'js-range-slider__first-value': 'setFirstValue',
    'js-range-slider__second-value': 'setSecondValue',
    'js-range-slider__tips': 'setTips',
    'js-range-slider__scale': 'setScale',
    'js-range-slider__range': 'setRange',
    'js-range-slider__progress-bar': 'setProgress',
    'js-range-slider__orientation': 'setOrientation',
  }

  private _$minInput: JQuery<HTMLElement> | undefined;

  private _$maxInput: JQuery<HTMLElement> | undefined;

  private _$stepInput: JQuery<HTMLElement> | undefined;

  private _$firstValueInput: JQuery<HTMLElement>;

  private _$secondValueInput: JQuery<HTMLElement> | undefined;

  private _$orientationInput: JQuery<HTMLElement> | undefined;

  private _$progressInput: JQuery<HTMLElement> | undefined;

  private _$scaleInput: JQuery<HTMLElement> | undefined;

  private _$tipsInput: JQuery<HTMLElement> | undefined;

  private _$rangeInput: JQuery<HTMLElement> | undefined;

  private _$slider: JQuery<HTMLElement>;

  private readonly _$rootElement: JQuery<HTMLElement>;

  constructor(rootElement: HTMLElement) {
    this._$rootElement = $(rootElement);
    this._$slider = $(this._$rootElement).find('.js-range-slider__slider-container');
    this._$firstValueInput = this._$rootElement.find('.js-range-slider__first-value');
    this._init();
    this._addEvents();
  }

  private _init(): void {
    this._$minInput = this._$rootElement.find('.js-range-slider__min');
    this._$maxInput = this._$rootElement.find('.js-range-slider__max');
    this._$stepInput = this._$rootElement.find('.js-range-slider__step');
    this._$secondValueInput = this._$rootElement.find('.js-range-slider__second-value');
    this._$orientationInput = this._$rootElement.find('.js-range-slider__orientation');
    this._$progressInput = this._$rootElement.find('.js-range-slider__progress-bar');
    this._$scaleInput = this._$rootElement.find('.js-range-slider__scale');
    this._$tipsInput = this._$rootElement.find('.js-range-slider__tips');
    this._$rangeInput = this._$rootElement.find('.js-range-slider__range');
  }

  private _addEvents(): void {
    this._$rootElement.on('input', this._handleSliderInput);
    this._$slider.slider('onChange', this._handleModelChange.bind(this));
  }

  private _handleModelChange(state: IState): void {
    this._$maxInput?.val(state.max);
    this._$minInput?.val(state.min);
    this._$stepInput?.val(state.step);
    this._$firstValueInput?.val(state.value[0]);
    this._$secondValueInput?.val(state.value[1]);
    this._$rangeInput?.prop('checked', state.range);
    this._$tipsInput?.prop('checked', state.tips);
    this._$progressInput?.prop('checked', state.progressBar);
    this._$scaleInput?.prop('checked', state.scale);
    const orientation = state.orientation === Orientation.VERTICAL;
    this._$orientationInput?.prop('checked', orientation);
    if (!state.range) {
      this._$firstValueInput.prop('disabled', true);
      return;
    }
    this._$firstValueInput.prop('disabled', false);
  }

  private _handleSliderInput = (evt: Event): void => {
    const target = evt.target as HTMLInputElement;
    let value: boolean | number | string = 0;
    const className: string = (target.classList as DOMTokenList)[1];

    if (className === 'js-range-slider__orientation') {
      value = target.checked;
      if (value) {
        value = Orientation.VERTICAL;
      } else {
        value = Orientation.HORIZONTAL;
      }
    } else if (target.type === 'checkbox') {
      value = target.checked;
    } else {
      value = Number(target.value);
    }
    this._$slider.slider(this._inputs[className], value);
  }
}

export default RangeSlider;
