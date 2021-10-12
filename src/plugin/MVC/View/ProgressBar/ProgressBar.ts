import Classes from "../../../types/classes"
import setType from '../../../helpers/setType';
import {IRunnerService, IProgressBar} from '../../../types/interfaces';
import RunnerService from '../RunnerService/RunnerService';
import InterfacesNames from '../../../types/interfacesNames';
import Orientation from "../../../types/orientation";

class ProgressBar {
  private progressBar: HTMLElement = document.createElement('div')
  private runnerService: RunnerService;
  private runnerServiceData: IRunnerService;
  private progressBarState: IProgressBar;

  constructor(progressBarState: IProgressBar) {
    this.progressBarState = progressBarState
    this.runnerServiceData = setType(InterfacesNames.IRunnerService, this.progressBarState)
    this.runnerService = new RunnerService(this.runnerServiceData)
    this.addClass()
    this.addElems()
  }

  public update(progressBarState: IProgressBar): void {
    if(this.progressBarState.orientation !== progressBarState.orientation) {
      this.addClass()
    }
    if(this.progressBarState.range !== progressBarState.range) {
      this.removeElems()
      this.addElems()
    }
    this.progressBarState = progressBarState
    this.runnerServiceData = setType(InterfacesNames.IRunnerService, this.progressBarState)
    this.runnerService.update(this.runnerServiceData)
  }

  public getTemplate(): HTMLElement {
    return this.progressBar
  }

  private addElems(): void {
    this.runnerService.getTemplate().forEach((runner) => {
      this.progressBar.append(runner)
    })
  }

  private removeElems(): void {
    this.progressBar.innerHTML = ''
  }

  private addClass(): void {
    this.progressBar.className = ''
    this.progressBar.classList.add(Classes.sliderActiveLine)
    if(this.progressBarState.orientation === Orientation.VERTICAL) {
      this.progressBar.classList.add(Classes.sliderActiveLineVertical)
    } else {
      this.progressBar.classList.add(Classes.sliderActiveLineHorizontal)
    }
  }
}

export default ProgressBar