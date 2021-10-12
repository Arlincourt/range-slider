import Classes from "../../../types/classes"
import setType from '../../../helpers/setType';
import {IRunnerService, IProgressBar} from '../../../types/interfaces';
import RunnerService from '../RunnerService/RunnerService';
import InterfacesNames from '../../../types/interfacesNames';

class ProgressBar {
  private progressBar: HTMLElement = document.createElement('div')
  private runnerService: RunnerService;
  private runnerServiceData: IRunnerService;
  private progressBarData: IProgressBar;

  constructor(progressBarData: IProgressBar) {
    this.progressBarData = progressBarData
    this.runnerServiceData = setType(InterfacesNames.IRunnerService, this.progressBarData)
    this.runnerService = new RunnerService(this.runnerServiceData)
  }

  public update(progressBarData: IProgressBar) {
    this.progressBarData = progressBarData
    this.runnerServiceData = setType(InterfacesNames.IRunnerService, this.progressBarData)
    this.runnerService.update(this.runnerServiceData)
  }

  addClass() {

  }
}

export default ProgressBar