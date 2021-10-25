import Runner from '../Runner/Runner';
import { IRunner, IRunnerService } from '../../../types/interfaces';
import setType from '../../../helpers/setType';
import InterfacesNames from '../../../types/interfacesNames';
import Orientation from '../../../types/orientation';
import Classes from '../../../types/classes';
import copyObject from '../../../helpers/copyObject';

enum Orders {
  first = 'first',
  second = 'second',
}

class RunnerService {
  private firstRunner: Runner;

  private secondRunner: Runner;

  private firstRunnerData: IRunner;

  private secondRunnerData: IRunner;

  private runnerServiceState: IRunnerService;

  constructor(runnerServiceState: IRunnerService) {
    this.runnerServiceState = copyObject(runnerServiceState);
    this.firstRunnerData = this.setClass(
      setType(InterfacesNames.IRunner, this.runnerServiceState, 0), Orders.first,
    );
    this.secondRunnerData = this.setClass(
      setType(InterfacesNames.IRunner, this.runnerServiceState, 1), Orders.second,
    );
    this.firstRunner = new Runner(this.firstRunnerData);
    this.secondRunner = new Runner(this.secondRunnerData);
  }

  public update(runnerServiceState: IRunnerService): void {
    this.runnerServiceState = copyObject(runnerServiceState);
    this.firstRunnerData = this.setClass(
      setType(InterfacesNames.IRunner, this.runnerServiceState, 0), Orders.first,
    );
    this.secondRunnerData = this.setClass(
      setType(InterfacesNames.IRunner, this.runnerServiceState, 1), Orders.second,
    );
    this.firstRunner.update(this.firstRunnerData);
    this.secondRunner.update(this.secondRunnerData);
  }

  public getTemplate(): HTMLElement[] {
    if (this.runnerServiceState.range) {
      return [this.firstRunner.getTemplate(), this.secondRunner.getTemplate()];
    }
    return [this.secondRunner.getTemplate()];
  }

  get getFirstRunner(): Runner {
    return this.firstRunner;
  }

  get getSecondRunner(): Runner {
    return this.secondRunner;
  }

  get getSecondRunnerData(): IRunner {
    return this.secondRunnerData;
  }

  get getFirstRunnerData(): IRunner {
    return this.firstRunnerData;
  }

  get getRunnerServiceState(): IRunnerService {
    return this.runnerServiceState;
  }

  private setClass(runnerData: IRunner, order: string): IRunner {
    const isFirst = order === Orders.first;
    if (runnerData.orientation === Orientation.VERTICAL) {
      /* eslint no-param-reassign: "error" */
      runnerData.classList = [Classes.sliderItem, Classes.sliderItemVertical];

      if (isFirst) {
        runnerData.classList.push(Classes.sliderItemTop);
      } else {
        runnerData.classList.push(Classes.sliderItemBottom);
      }
    } else {
      /* eslint no-param-reassign: "error" */
      runnerData.classList = [Classes.sliderItem, Classes.sliderItemHorizontal];

      if (isFirst) {
        runnerData.classList.push(Classes.sliderItemLeft);
      } else {
        runnerData.classList.push(Classes.sliderItemRight);
      }
    }
    return runnerData;
  }
}

export default RunnerService;
