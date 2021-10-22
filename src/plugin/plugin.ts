/// <reference path="plugin.d.ts"/>;
import {IState, IOptions} from './types/interfaces';
import Slider from './Slider';

(function ($) {
  $.fn.slider = function (options: IOptions | string, ...args: any): IState | JQuery {
    const $element: JQuery = $(this);
    const element = this[0]


    if(!!$element.data('slider')) {
      $element.each((_, elem) => {
        createSlider({}, elem)
      })
    } else if (typeof options === 'object') {
      createSlider(options, element);
    } else if (typeof options === 'string' && args.length === 0) {
      console.log($(element).data('slider'))
      return $(element).data('slider')[options]()
    } else if(typeof options === 'string' && args.length !== 0) {
      return $(element).data('slider')[options](...args)
    }

    return this;
  };
}(jQuery));


function createSlider(options: IOptions, element: HTMLElement): void {
  const $element = $(element)
  const dataAttrs: IOptions = {
    min: $element.data('min'),
    max: $element.data('max'),
    tips: $element.data('tips'),
    step: $element.data('step'),
    range: $element.data('range'),
    orientation: $element.data('orientation'),
    value: $element.data('value')
  }

  let state = $.extend(dataAttrs, options);
  state = removeUndefinedFields(state)

  const slider = new Slider(state, element);
  $element.data('slider', slider)
}

function removeUndefinedFields(state: IOptions) {
  const obj: any = {...state}
  for(let prop in obj) {
    if(obj[prop] === undefined) {
      delete obj[prop]
    }
  }
  
  return obj
}