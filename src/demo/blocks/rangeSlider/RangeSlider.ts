import { IState } from '../../../plugin/types/interfaces';
import Orientation from '../../../plugin/types/orientation';

class RangeSlider {
  private $minInput: JQuery<HTMLElement> | undefined

  private $maxInput: JQuery<HTMLElement> | undefined

  private $stepInput: JQuery<HTMLElement> | undefined

  private $firstValueInput: JQuery<HTMLElement> | undefined

  private $secondValueInput: JQuery<HTMLElement> | undefined

  private $orientationInput: JQuery<HTMLElement> | undefined

  private $progressInput: JQuery<HTMLElement> | undefined

  private $tipsInput: JQuery<HTMLElement> | undefined

  private $rangeInput: JQuery<HTMLElement> | undefined

  private $slider: JQuery<HTMLElement>

  private readonly $rootElement: JQuery<HTMLElement>

  constructor(rootElement: HTMLElement) {
    this.$rootElement = $(rootElement);
    this.$slider = $(this.$rootElement).find('.js-range-slider__slider-container');
    this.init();
    this.addEvents();
  }

  private init(): void {
    this.$minInput = this.$rootElement.find('.js-range-slider__min');
    this.$maxInput = this.$rootElement.find('.js-range-slider__max');
    this.$stepInput = this.$rootElement.find('.js-range-slider__step');
    this.$firstValueInput = this.$rootElement.find('.js-range-slider__first-value');
    this.$secondValueInput = this.$rootElement.find('.js-range-slider__second-value');
    this.$orientationInput = this.$rootElement.find('.js-range-slider__orientation');
    this.$progressInput = this.$rootElement.find('.js-range-slider__progress-bar');
    this.$tipsInput = this.$rootElement.find('.js-range-slider__tips');
    this.$rangeInput = this.$rootElement.find('.js-range-slider__range');
  }

  private addEvents(): void {
    this.$minInput?.on('change', this.handleMinInputChange);
    this.$maxInput?.on('change', this.handleMaxInputChange);
    this.$stepInput?.on('change', this.handleStepInputChange);
    this.$firstValueInput?.on('change', this.handleFirstValueInputChange);
    this.$secondValueInput?.on('change', this.handleSecondValueInputChange);
    this.$tipsInput?.on('change', this.handleTipsInputChange);
    this.$rangeInput?.on('change', this.handleRangeInputChange);
    this.$orientationInput?.on('change', this.handleOrientationInputChange);
    this.$progressInput?.on('change', this.handleProgressInputChange);
    this.$slider.slider('onChange', this.onModelChange.bind(this));
  }

  private onModelChange(state: IState): void {
    this.$minInput?.val(state.min);
    this.$maxInput?.val(state.max);
    this.$stepInput?.val(state.step);
    this.$firstValueInput?.val(state.value[0]);
    this.$secondValueInput?.val(state.value[1]);
    this.$rangeInput?.prop('checked', state.range);
    this.$tipsInput?.prop('checked', state.tips);
    this.$progressInput?.prop('checked', state.progressBar);
    const orientation = state.orientation === Orientation.VERTICAL;
    this.$orientationInput?.prop('checked', orientation);
  }

  private handleMinInputChange = (): void => {
    const value = Number(this.$minInput?.val());
    this.$slider.slider('setMin', value);
    this.$minInput?.val(String(this.$slider.slider('getMin')));
  }

  private handleMaxInputChange = (): void => {
    const value = Number(this.$maxInput?.val());
    this.$slider.slider('setMax', value);
    this.$maxInput?.val(String(this.$slider.slider('getMax')));
  }

  private handleStepInputChange = (): void => {
    const value = Number(this.$stepInput?.val());
    this.$slider.slider('setStep', value);
    this.$stepInput?.val(String(this.$slider.slider('getStep')));
  }

  private handleFirstValueInputChange = (): void => {
    const value = Number(this.$firstValueInput?.val());
    this.$slider.slider('setFirstValue', value);
    this.$firstValueInput?.val(String(this.$slider.slider('getFirstValue')));
  }

  private handleSecondValueInputChange = (): void => {
    const value = Number(this.$secondValueInput?.val());
    this.$slider.slider('setSecondValue', value);
    this.$secondValueInput?.val(String(this.$slider.slider('getSecondValue')));
  }

  private handleTipsInputChange = (): void => {
    const value = this.$tipsInput?.is(':checked');
    this.$slider.slider('setTips', value);
  }

  private handleProgressInputChange = (): void => {
    const value = this.$progressInput?.is(':checked');
    this.$slider.slider('setProgress', value);
  }

  private handleRangeInputChange = (): void => {
    const value = this.$rangeInput?.is(':checked');
    this.$slider.slider('setRange', value);
  }

  private handleOrientationInputChange = (): void => {
    let value: boolean | string | undefined = this.$orientationInput?.is(':checked');
    if (value) {
      value = Orientation.VERTICAL;
    } else {
      value = Orientation.HORIZONTAL;
    }
    this.$slider.slider('setOrientation', value);
  }
}

export default RangeSlider;
