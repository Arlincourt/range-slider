import { data } from 'jquery';
import Slider from './Slider';
import { IState, IOptions } from './types/interfaces';

function removeUndefinedFields(state: IOptions) {
  const obj: any = { ...state };
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
  };

  let state = $.extend(dataAttrs, options);
  state = removeUndefinedFields(state);
  const slider = new Slider(state, element);
  $element.data('slider', slider);
}

(function IIFE($) {
  /* eslint no-param-reassign: "error" */
  $.fn.slider = function slider(options: IOptions | string, ...args: any): IState | JQuery {
    const $element: JQuery = $(this);
    const element = this[0];
    
    if (typeof options === 'object') {
      createSlider(options, element);
    } else if ($element.data('slider') === undefined || typeof options === 'object') {
      $element.each((_, elem) => {
        createSlider({}, elem);
      });
    } else if (typeof options === 'string' && args.length === 0) {
      return $(element).data('slider')[options]();
    } else if (typeof options === 'string' && args.length !== 0) {
      return $(element).data('slider')[options](...args);
    }

    return this;
  };
}(jQuery));
