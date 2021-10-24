import { IState } from "plugin/types/interfaces"
import Orientation from "../../../plugin/types/orientation"

class RangeSlider {
  private $minInput: JQuery<HTMLElement> | undefined
  private $maxInput: JQuery<HTMLElement> | undefined
  private $stepInput: JQuery<HTMLElement> | undefined
  private $firstValueInput: JQuery<HTMLElement> | undefined
  private $secondValueInput: JQuery<HTMLElement> | undefined
  private $orientationInput: JQuery<HTMLElement> | undefined
  private $tipsInput: JQuery<HTMLElement> | undefined
  private $rangeInput: JQuery<HTMLElement> | undefined
  private $slider: JQuery<HTMLElement>
  private readonly $rootElement: JQuery<HTMLElement>

  constructor(rootElement: HTMLElement) {
    this.$rootElement = $(rootElement)
    this.$slider = $(this.$rootElement).find('.js-range-slider__slider-container')
    this.init()
    this.addEvents()
  }

  private init(): void {
    this.$minInput = this.$rootElement.find('.js-range-slider__min')
    this.$maxInput = this.$rootElement.find('.js-range-slider__max')
    this.$stepInput = this.$rootElement.find('.js-range-slider__step')
    this.$firstValueInput = this.$rootElement.find('.js-range-slider__first-value')
    this.$secondValueInput = this.$rootElement.find('.js-range-slider__second-value')
    this.$orientationInput = this.$rootElement.find('.js-range-slider__orientation')
    this.$tipsInput = this.$rootElement.find('.js-range-slider__tips')
    this.$rangeInput = this.$rootElement.find('.js-range-slider__range')
  }

  private addEvents(): void {
    this.$minInput?.on('change', this.handleMinInputChange)
  }

  private handleMinInputChange = (evt: Event): void => {
    const value = Number(this.$minInput?.val())
    this.$slider.slider('setMin', value)
    this.$minInput?.val(String(this.$slider.slider('getMin')))
  }
}

export default RangeSlider