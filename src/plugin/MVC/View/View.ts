import {IState} from '../../types/interfaces';
import Observer from '../../Observer/Observer';
import Classes from '../../types/classes';
import Interval from './Interval/Interval'
import RunnerService from './RunnerService/RunnerService';
import {IRunnerService} from '../../types/interfaces';
import InterfacesNames from '../../types/interfacesNames';
import setType from '../../helpers/setType';
import { IRunner } from "../../types/interfaces";

class View {
  public observer?: Observer;
  private rootElement: HTMLElement;
  private slider: HTMLElement = document.createElement('div')
  private state: IState;
  private interval: Interval;
  private runnerService: RunnerService;
  private runnerServiceData: IRunnerService;

  constructor(element: HTMLElement, state: IState) {
    this.state = state
    this.rootElement = element
    this.interval = new Interval()
    this.runnerServiceData = setType(InterfacesNames.IRunnerService, this.state)
    this.runnerService = new RunnerService(this.runnerServiceData)
    this.init()
  }
  
  public init() {
    
  }
  
  public update(state: IState) {
    
  }

  private addClass() {
    this.slider.classList.add(Classes.slider)
  }
}

export default View;
