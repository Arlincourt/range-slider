import InterfacesNames from '../../../types/interfacesNames';
import Orientation from '../../../types/orientation';
import Classes from '../../../types/classes';
import { IRunner, IRunnerService, ICombinedTip } from '../../../types/interfaces';
import setType from '../../../helpers/setType';
import copyObject from '../../../helpers/copyObject';
import Runner from '../Runner/Runner';
import CombinedTip from '../CombinedTip/CombinedTip'

enum Orders {
  first = 'first',
  second = 'second',
}

class RunnerService {
  private firstRunner: Runner;

  private secondRunner: Runner;

  private firstRunnerData: IRunner;

  private secondRunnerData: IRunner;

  private combinedTip: CombinedTip;
  
  private combinedTipData: ICombinedTip;

  private runnerServiceState: IRunnerService;

  private elements: HTMLElement[];

  constructor(runnerServiceState: IRunnerService) {
    this.runnerServiceState = copyObject(runnerServiceState);
    this.combinedTipData = setType(InterfacesNames.ICombinedTip, this.runnerServiceState)
    this.combinedTip = new CombinedTip(this.combinedTipData)
    this.firstRunnerData = this.setClass(
      setType(InterfacesNames.IRunner, this.runnerServiceState, 0), Orders.first,
    );
    this.secondRunnerData = this.setClass(
      setType(InterfacesNames.IRunner, this.runnerServiceState, 1), Orders.second,
    );
    this.firstRunner = new Runner(this.firstRunnerData);
    this.secondRunner = new Runner(this.secondRunnerData);
    this.elements = [this.firstRunner.getTemplate(), this.secondRunner.getTemplate()]
  }

  public update(runnerServiceState: IRunnerService): void {
    this.runnerServiceState = copyObject(runnerServiceState);
    this.updateRunnersData()
    this.updateRunners()
    this.customizeDisplay()
    this.updateCombinedTip()
    this.setElements()
  }

  public getTemplate(): HTMLElement[] {
    return this.elements
  }

  private isOverlap(): boolean {
    if(this.runnerServiceState.range === false || this.runnerServiceState.tips === false) {
      return false
    }
    const firstTipSize = this.firstRunner.getTipSize
    const secondTipSize = this.secondRunner.getTipSize
    const isXOverlap = firstTipSize.x + firstTipSize.width >= secondTipSize.x
    const isYOverlap = firstTipSize.y + firstTipSize.height >= secondTipSize.y
    
    if(this.runnerServiceState.orientation === Orientation.HORIZONTAL) {
      return isXOverlap
    }
    return isYOverlap
  }

  private updateRunnersData(): void {
    this.firstRunnerData = this.setClass(
      setType(InterfacesNames.IRunner, this.runnerServiceState, 0), Orders.first,
    );
    this.secondRunnerData = this.setClass(
      setType(InterfacesNames.IRunner, this.runnerServiceState, 1), Orders.second,
    );
  }

  private updateRunners(): void {
    this.firstRunner.update(this.firstRunnerData);
    this.secondRunner.update(this.secondRunnerData);
  }

  private updateCombinedTip(): void {
    this.combinedTipData = setType(InterfacesNames.ICombinedTip, this.runnerServiceState)
    this.combinedTip.update(this.combinedTipData)
  }

  private setElements(): void {
    if(this.runnerServiceState.range && !this.isOverlap()) {
      this.elements = [this.firstRunner.getTemplate(), this.secondRunner.getTemplate()]
    } else if(this.isOverlap()) {
      this.elements = [this.firstRunner.getTemplate(), this.secondRunner.getTemplate(), this.combinedTip.getTemplate()]
    } else {
      this.elements = [this.secondRunner.getTemplate()]
    }
  }

  private customizeDisplay(): void {
    if(this.isOverlap()) {
      this.firstRunnerData.tips = false 
      this.secondRunnerData.tips = false
      this.updateRunners()
    }
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
