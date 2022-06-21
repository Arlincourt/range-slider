import { IState, IEmit, IEmitEdge, ICoor } from '../../types/interfaces';
import Orientation from '../../types/orientation';
import Classes from '../../types/classes';
import Observer from '../../Observer/Observer';
import Interval from './Interval/Interval';

class View {
  public observer?: Observer;

  private _rootElement: HTMLElement;

  private _slider: HTMLElement = document.createElement('div');

  private _state: IState;

  private _interval: Interval;

  constructor(element: HTMLElement, state: IState) {
    this._state = { ...state };
    this._rootElement = element;
    this._interval = new Interval(this._state);
    this._init();
  }

  public update(state: IState): void {
    this._state = { ...state };
    this._interval.update(this._state);
  }

  get getTemplate(): HTMLElement {
    return this._slider;
  }

  get getState(): IState {
    return this._state;
  }

  private _init(): void {
    this._addClass();
    this._addEvents();
    this._addElems();
  }

  private _handleSliderMouseMove = (evt: MouseEvent): void => {
    const evtData: ICoor = {
      clientX: evt.clientX,
      clientY: evt.clientY,
      clientWidth: Number(this._slider.offsetWidth),
      clientHeight: Number(this._slider.offsetHeight),
      offsetX: this._slider.getBoundingClientRect().left + document.body.scrollLeft,
      offsetY: this._slider.getBoundingClientRect().top + document.body.scrollTop,
    };

    const emitData = {
      value: this._getCoorInPercent(evtData),
      mouseDown: false
    };

    this._emitChanges(emitData);
  }

  private _handleSliderMouseDown = (evt: MouseEvent): void => {
    if (this._isElem(evt.target as HTMLElement)) {
      const evtData: ICoor = {
        clientX: evt.clientX,
        clientY: evt.clientY,
        clientWidth: Number(this._slider.offsetWidth),
        clientHeight: Number(this._slider.offsetHeight),
        offsetX: this._slider.getBoundingClientRect().left + document.body.scrollLeft,
        offsetY: this._slider.getBoundingClientRect().top + document.body.scrollTop,
      };
      
      const emitData = {
        value: this._getCoorInPercent(evtData),
        mouseDown: true
      };
      if (this._isValue(evt.target as HTMLElement)) {
        (emitData as IEmitEdge).edge = Number((evt.target as HTMLElement).textContent);
      }

      this._emitChanges(emitData);
      document.addEventListener('mousemove', this._handleSliderMouseMove);
      document.addEventListener('mouseup', this._handleSliderMouseUp);
    }
  }

  private _handleSliderMouseUp = (): void => this._removeMoveAndUpEvents();

  private _addEvents(): void {
    this._slider.addEventListener('mousedown', this._handleSliderMouseDown);
  }

  private _removeMoveAndUpEvents(): void {
    document.removeEventListener('mousemove', this._handleSliderMouseMove);
    document.removeEventListener('mouseup', this._handleSliderMouseUp);
  }

  private _getCoorInPercent(state: ICoor): number {
    let value: number;
    if (this._state.orientation === Orientation.HORIZONTAL) {
      value = state.clientX - state.offsetX;
      value = (value / state.clientWidth) * 100;
      return value;
    }
    value = state.clientY - state.offsetY;
    value = (value / state.clientHeight) * 100;
    return value;
  }

  private _addElems(): void {
    this._slider.append(this._interval.getTemplate());
    this._rootElement.append(this._slider);
  }

  private _emitChanges(data: IEmit | IEmitEdge) {
    this.observer?.emit('viewChange', data);
  }

  private _isElem(element: HTMLElement): boolean {
    if (element === null) {
      return false;
    }
    if (this._isValue(element)) {
      return true;
    }
    if (this._isItem(element)) {
      return true;
    }
    if (this._isTip(element)) {
      return true;
    }
    if (this._isPoint(element)) {
      return true;
    }
    if (this._isLine(element)) {
      return true;
    }

    return false;
  }

  private _isValue(element: HTMLElement): boolean {
    return element.classList.contains(Classes.sliderValue);
  }

  private _isItem(element: HTMLElement): boolean {
    return element.classList.contains(Classes.sliderItem);
  }

  private _isTip(element: HTMLElement): boolean {
    return element.classList.contains(Classes.sliderTip);
  }

  private _isPoint(element: HTMLElement): boolean {
    return element.classList.contains(Classes.sliderPoint);
  }

  private _isLine(element: HTMLElement): boolean {
    return element.classList.contains(Classes.sliderActiveLine)
      || element.classList.contains(Classes.sliderLine);
  }

  private _addClass = () => this._slider.classList.add(Classes.slider);
}

export default View;
