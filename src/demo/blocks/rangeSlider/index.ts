import RangeSlider from './RangeSlider';

$(() => {
  // Здесь я не использую стрелочную функцию в одну строку, так как я не хочу возвращать
  // работу класса
  // RangeSlider и работу метода .slider(), иначе придется типизировать возвращаемые значения

  $('.js-range-slider__slider-container').each((_, elem): void => {
    $(elem).slider();
  });
  $('.js-range-slider').each((_, elem): void => {
    new RangeSlider(elem);
  });
});
