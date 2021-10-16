/// <reference path="plugin.d.ts"/>;
import IState from './types/IState';
import IOptions from './types/IOptions';
import Slider from './Slider';

(function ($) {
  $.fn.slider = function (options?: IOptions | string, value?: any): IState | JQuery {
    const element = this[0];

    if (typeof options === 'object') {
      new Slider(options, element);
    } else if (typeof options === 'string') {

    }

    return this;
  };
}(jQuery));
