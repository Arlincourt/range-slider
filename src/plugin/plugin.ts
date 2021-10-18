/// <reference path="plugin.d.ts"/>;
import {IState, IOptions} from './types/interfaces';
import Slider from './Slider';

(function ($) {
  $.fn.slider = function (options: IOptions | string, ...args: any): IState | JQuery {
    const element: HTMLElement = this[0];

    if (typeof options === 'object') {
      const slider = new Slider(options, element);
      $(element).data('slider', slider)
    } else if (typeof options === 'string' && args.length === 0) {
      console.log($(element).data('slider'))
      return $(element).data('slider')[options]()
    } else if(typeof options === 'string' && args.length !== 0) {
      return $(element).data('slider')[options](...args)
    }

    return this;
  };
}(jQuery));
