import { IState, IEmit, IEmitEdge, ICoor } from '../../types/interfaces';
import Orientation from '../../types/orientation';
import Classes from '../../types/classes';
import Observer from '../../Observer/Observer';
import Interval from './Interval/Interval';

class View {
  public observer?: Observer;

  private rootElement: HTMLElement;

  private slider: HTMLElement = document.createElement('div');

  private state: IState;

  private interval: Interval;

  constructor(element: HTMLElement, state: IState) {
    this.state = { ...state };
    this.rootElement = element;
    this.interval = new Interval(this.state);
    this.init();
  }

  public update(state: IState): void {
    this.state = { ...state };
    this.interval.update(this.state);
  }

  get getTemplate(): HTMLElement {
    return this.slider;
  }

  get getState(): IState {
    return this.state;
  }

  private init(): void {
    this.addClass();
    this.addEvents();
    this.addElems();
  }

  private handleSliderMouseMove = (evt: MouseEvent): void => {
    const evtData: ICoor = {
      clientX: evt.clientX,
      clientY: evt.clientY,
      clientWidth: Number(this.slider.offsetWidth),
      clientHeight: Number(this.slider.offsetHeight),
      offsetX: this.slider.getBoundingClientRect().left + document.body.scrollLeft,
      offsetY: this.slider.getBoundingClientRect().top + document.body.scrollTop,
    };

    const emitData = {
      value: this.getCoorInPercent(evtData),
      mouseDown: false
    };

    this.emitChanges(emitData);
  }

  private handleSliderMouseDown = (evt: MouseEvent): void => {
    if (this.isElem(evt.target as HTMLElement)) {
      const evtData: ICoor = {
        clientX: evt.clientX,
        clientY: evt.clientY,
        clientWidth: Number(this.slider.offsetWidth),
        clientHeight: Number(this.slider.offsetHeight),
        offsetX: this.slider.getBoundingClientRect().left + document.body.scrollLeft,
        offsetY: this.slider.getBoundingClientRect().top + document.body.scrollTop,
      };
      
      const emitData = {
        value: this.getCoorInPercent(evtData),
        mouseDown: true
      };
      if (this.isValue(evt.target as HTMLElement)) {
        (emitData as IEmitEdge).edge = Number((evt.target as HTMLElement).textContent);
      }

      this.emitChanges(emitData);
      document.addEventListener('mousemove', this.handleSliderMouseMove);
      document.addEventListener('mouseup', this.handleSliderMouseUp);
    }
  }

  private handleSliderMouseUp = (): void => this.removeMoveAndUpEvents();

  private addEvents(): void {
    this.slider.addEventListener('mousedown', this.handleSliderMouseDown);
  }

  private removeMoveAndUpEvents(): void {
    document.removeEventListener('mousemove', this.handleSliderMouseMove);
    document.removeEventListener('mouseup', this.handleSliderMouseUp);
  }

  private getCoorInPercent(state: ICoor): number {
    let value: number;
    if (this.state.orientation === Orientation.HORIZONTAL) {
      value = state.clientX - state.offsetX;
      value = (value / state.clientWidth) * 100;
      return value;
    }
    value = state.clientY - state.offsetY;
    value = (value / state.clientHeight) * 100;
    return value;
  }

  private addElems(): void {
    this.slider.append(this.interval.getTemplate());
    this.rootElement.append(this.slider);
  }

  private emitChanges(data: IEmit | IEmitEdge) {
    this.observer?.emit('handleViewChange', data);
  }

  private isElem(element: HTMLElement): boolean {
    if (element === null) {
      return false;
    }
    if (this.isValue(element)) {
      return true;
    }
    if (this.isItem(element)) {
      return true;
    }
    if (this.isTip(element)) {
      return true;
    }
    if (this.isPoint(element)) {
      return true;
    }
    if (this.isLine(element)) {
      return true;
    }

    return false;
  }

  private isValue(element: HTMLElement): boolean {
    return element.classList.contains(Classes.sliderValue);
  }

  private isItem(element: HTMLElement): boolean {
    return element.classList.contains(Classes.sliderItem);
  }

  private isTip(element: HTMLElement): boolean {
    return element.classList.contains(Classes.sliderTip);
  }

  private isPoint(element: HTMLElement): boolean {
    return element.classList.contains(Classes.sliderPoint);
  }

  private isLine(element: HTMLElement): boolean {
    return element.classList.contains(Classes.sliderActiveLine)
      || element.classList.contains(Classes.sliderLine);
  }

  private addClass = () => this.slider.classList.add(Classes.slider);
}

export default View;
