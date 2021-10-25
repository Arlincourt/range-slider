import RangeSlider from './RangeSlider'

$(() => {
  $('.js-range-slider__slider-container').each((_, elem) => {
    $(elem).slider()
  })
  $('.js-range-slider').each((_, elem) => {
    new RangeSlider(elem)
  })
})