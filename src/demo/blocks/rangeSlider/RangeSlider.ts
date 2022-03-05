import { IState } from '../../../plugin/types/interfaces';
import Orientation from '../../../plugin/types/orientation';

interface IInputs {
  [key: string]: string;
}

class RangeSlider {
  private inputs: IInputs = {
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

  private $minInput: JQuery<HTMLElement> | undefined

  private $maxInput: JQuery<HTMLElement> | undefined

  private $stepInput: JQuery<HTMLElement> | undefined

  private $firstValueInput: JQuery<HTMLElement>

  private $secondValueInput: JQuery<HTMLElement> | undefined

  private $orientationInput: JQuery<HTMLElement> | undefined

  private $progressInput: JQuery<HTMLElement> | undefined

  private $scaleInput: JQuery<HTMLElement> | undefined

  private $tipsInput: JQuery<HTMLElement> | undefined

  private $rangeInput: JQuery<HTMLElement> | undefined

  private $slider: JQuery<HTMLElement>

  private readonly $rootElement: JQuery<HTMLElement>

  constructor(rootElement: HTMLElement) {
    this.$rootElement = $(rootElement);
    this.$slider = $(this.$rootElement).find('.js-range-slider__slider-container');
    this.$firstValueInput = this.$rootElement.find('.js-range-slider__first-value');
    this.init();
    this.addEvents();
  }

  private init(): void {
    this.$minInput = this.$rootElement.find('.js-range-slider__min');
    this.$maxInput = this.$rootElement.find('.js-range-slider__max');
    this.$stepInput = this.$rootElement.find('.js-range-slider__step');
    this.$secondValueInput = this.$rootElement.find('.js-range-slider__second-value');
    this.$orientationInput = this.$rootElement.find('.js-range-slider__orientation');
    this.$progressInput = this.$rootElement.find('.js-range-slider__progress-bar');
    this.$scaleInput = this.$rootElement.find('.js-range-slider__scale');
    this.$tipsInput = this.$rootElement.find('.js-range-slider__tips');
    this.$rangeInput = this.$rootElement.find('.js-range-slider__range');
  }

  private addEvents(): void {
    this.$rootElement.on('input', this.handleSliderInput);
    this.$slider.slider('onChange', this.handleModelChange.bind(this));
  }

  private handleModelChange(state: IState): void {
    this.$maxInput?.val(state.max);
    this.$minInput?.val(state.min);
    this.$stepInput?.val(state.step);
    this.$firstValueInput?.val(state.value[0]);
    this.$secondValueInput?.val(state.value[1]);
    this.$rangeInput?.prop('checked', state.range);
    this.$tipsInput?.prop('checked', state.tips);
    this.$progressInput?.prop('checked', state.progressBar);
    this.$scaleInput?.prop('checked', state.scale);
    const orientation = state.orientation === Orientation.VERTICAL;
    this.$orientationInput?.prop('checked', orientation);
    if (!state.range) {
      this.$firstValueInput.prop('disabled', true);
      return;
    }
    this.$firstValueInput.prop('disabled', false);
  }

  private handleSliderInput = (evt: Event): void => {
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
    this.$slider.slider(this.inputs[className], value);
  }
}

export default RangeSlider;
