/// <reference path="plugin.d.ts"/>;
import IOptions from './types/IOptions';
import IState from './types/IState';
import Slider from './Slider';

(function($) {
  $.fn.slider = function(options?: IOptions | string, value?: any): IState | JQuery {
    const $element = $(this)

    if(typeof options === 'object') {
      new Slider(options, $element)
    } else if(typeof options === 'string') {

    }
    
    return this
  }
})(jQuery);



$(() => {
  $('h1').slider({options: 2})
})