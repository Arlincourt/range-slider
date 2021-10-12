import {IState} from '../../types/interfaces';
import Observer from '../../Observer/Observer';
import Classes from '../../types/classes';
import ProgressBar from './ProgressBar/ProgressBar';

class View {
  public observer?: Observer;
  private rootElement: HTMLElement;
  private slider: HTMLElement = document.createElement('div')
  private body: HTMLElement = document.createElement('div')
  private state: IState;
  private progressBar: ProgressBar;

  constructor(element: HTMLElement, state: IState) {
    this.state = state
    this.progressBar = new ProgressBar(this.state)
    this.rootElement = element
    this.init()
  }
  
  public init() {
    
  }
  
  public update(state: IState) {
    this.state = state
    this.progressBar.update(this.state)
  }

  private emitChanges() {
    this.observer?.emit('viewChange', this.state)
  }

  private addClass() {
    this.slider.classList.add(Classes.slider)
  }
}

export default View;
