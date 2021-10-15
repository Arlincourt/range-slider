import {IState} from '../../types/interfaces';
import Observer from '../../Observer/Observer';
import Classes from '../../types/classes';
import Interval from './Interval/Interval';

class View {
  public observer?: Observer;
  private rootElement: HTMLElement;
  private slider: HTMLElement = document.createElement('div')
  private state: IState;
  private interval: Interval

  constructor(element: HTMLElement, state: IState) {
    this.state = state
    this.rootElement = element
    this.interval = new Interval(this.state)
    this.init()
  }
  
  public init() {
    
  }
  
  public update(state: IState) {
    this.state = state
  }

  private emitChanges() {
    this.observer?.emit('viewChange', this.state)
  }

  private addClass() {
    this.slider.classList.add(Classes.slider)
  }
}

export default View;
