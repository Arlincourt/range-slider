import IState from '../../types/IState';
import Observer from '../../Observer/Observer';
import Classes from '../../types/classes';
import Interval from './Interval/Interval'
import RunnerService from './RunnerService/RunnerService';
import IRunnerService from '../../types/IRunnerService';
import InterfacesNames from '../../types/interfacesNames';

class View {
  public observer?: Observer;
  private rootElement: HTMLElement;
  private slider: HTMLElement = document.createElement('div')
  private state: IState;
  private interval: Interval;
  private RunnerService: RunnerService;
  private RunnerServiceData: IRunnerService;

  constructor(element: HTMLElement, state: IState) {
    this.state = state
    this.RunnerServiceData = this.setType(InterfacesNames.IRunnerService)
    this.rootElement = element
    this.interval = new Interval()
    this.RunnerService = new RunnerService(this.RunnerServiceData)
    this.init()
  }
  
  public init() {
    
  }
  
  public update(state: IState) {
    
  }

  private setType(type: string): IRunnerService {
    switch(type) {
      case InterfacesNames.IRunnerService:
        return {
          tips: this.state.tips,
          range: this.state.range,
          orientation: this.state.orientation,
          value: this.state.value
        }
        break;
      default: 
        return {...this.state}
    }
  }

  private addClass() {
    this.slider.classList.add(Classes.slider)
  }
}

export default View;
