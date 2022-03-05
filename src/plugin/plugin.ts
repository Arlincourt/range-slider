import Slider from './Slider';
import {
  IState, IOptions, IUniversalObjectType, IArgs,
} from './types/interfaces';

function removeUndefinedFields(state: IOptions) {
  const obj: IUniversalObjectType = { ...state };
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });

  return obj;
}

function createSlider(options: IOptions, element: HTMLElement): void {
  const $element = $(element);
  const dataAttrs: IOptions = {
    min: $element.data('min'),
    max: $element.data('max'),
    tips: $element.data('tips'),
    progressBar: $element.data('progress'),
    step: $element.data('step'),
    range: $element.data('range'),
    orientation: $element.data('orientation'),
    value: $element.data('values'),
    scale: $element.data('scale'),
  };

  let state = $.extend(dataAttrs, options);
  state = removeUndefinedFields(state);
  const slider = new Slider(state, element);
  $element.data('slider', slider);
}

(function IIFE($) {
  /* eslint no-param-reassign: "error" */
  $.fn.slider = function slider(
    options: IOptions | string, ...args: Array<IArgs>
  ): IState | JQuery {
    const $element: JQuery = $(this);
    const element = this[0];
    const isSliderUndefined = $element.data('slider') === undefined;
    const isObject = typeof options === 'object';
    const isString = typeof options === 'string';
    const isNoArguments = args.length === 0;

    if (isObject) {
      createSlider(options, element);
    } else if (isSliderUndefined || isObject) {
      $element.each((_, elem) => {
        createSlider({}, elem);
      });
    } else if (isString && isNoArguments) {
      return $(element).data('slider')[options]();
    } else if (isString && !isNoArguments) {
      return $(element).data('slider')[options](...args);
    }

    return this;
  };
}(jQuery));
