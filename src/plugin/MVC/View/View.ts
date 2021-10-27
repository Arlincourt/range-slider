import { IState, IEmit } from '../../types/interfaces';
import Classes from '../../types/classes';
import Observer from '../../Observer/Observer';
import copyObject from '../../helpers/copyObject';
import Interval from './Interval/Interval';

class View {
  public observer?: Observer;

  private rootElement: HTMLElement;

  private slider: HTMLElement = document.createElement('div')

  private state: IState;

  private interval: Interval

  constructor(element: HTMLElement, state: IState) {
    this.state = copyObject(state);
    this.rootElement = element;
    this.interval = new Interval(this.state);
    this.init();
  }

  public init(): void {
    this.addClass();
    this.addEvents();
    this.addElems();
  }

  public update(state: IState): void {
    this.state = copyObject(state);
    this.interval.update(this.state);
  }

  get getTemplate(): HTMLElement {
    return this.slider;
  }

  get getState(): IState {
    return this.state;
  }

  private onSliderMouseMove = (evt: MouseEvent): void => {
    const emitData: IEmit = {
      clientX: evt.clientX,
      clientY: evt.clientY,
      clientWidth: Number(this.slider.offsetWidth),
      clientHeight: Number(this.slider.offsetHeight),
      offsetX: this.slider.getBoundingClientRect().left + document.body.scrollLeft,
      offsetY: this.slider.getBoundingClientRect().top + document.body.scrollTop,
      mouseDown: false,
    };

    this.emitChanges(emitData);
  }

  private onSliderMouseDown = (evt: MouseEvent): void => {
    if (this.isElem(evt.target as HTMLElement)) {
      const emitData: IEmit = {
        clientX: evt.clientX,
        clientY: evt.clientY,
        clientWidth: Number(this.slider.offsetWidth),
        clientHeight: Number(this.slider.offsetHeight),
        offsetX: this.slider.getBoundingClientRect().left + document.body.scrollLeft,
        offsetY: this.slider.getBoundingClientRect().top + document.body.scrollTop,
        mouseDown: true,
      };
      this.emitChanges(emitData);
      document.addEventListener('mousemove', this.onSliderMouseMove);
      document.addEventListener('mouseup', this.onSliderMouseUp);
    }
  }

  private onSliderMouseUp = (): void => {
    this.removeMoveAndUpEvents();
  }

  private addEvents(): void {
    this.slider.addEventListener('mousedown', this.onSliderMouseDown);
  }

  private removeMoveAndUpEvents(): void {
    document.removeEventListener('mousemove', this.onSliderMouseMove);
    document.removeEventListener('mouseup', this.onSliderMouseUp);
  }

  private addElems(): void {
    this.slider.append(this.interval.getTemplate());
    this.rootElement.append(this.slider);
  }

  private emitChanges(data: IEmit) {
    this.observer?.emit('viewChange', data);
  }

  private isElem(element: HTMLElement): boolean {
    if (this.isEdge(element)) {
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

  private isEdge(element: HTMLElement): boolean {
    return element.classList.contains(Classes.sliderEdge);
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

  private addClass() {
    this.slider.classList.add(Classes.slider);
  }
}

export default View;
