import InterfacesNames from '../../../types/interfacesNames';
import Orientation from '../../../types/orientation';
import Classes from '../../../types/classes';
import { IRunner, IRunnerService, ICombinedTip } from '../../../types/interfaces';
import setType from '../../../helpers/setType';
import Runner from '../Runner/Runner';
import CombinedTip from '../CombinedTip/CombinedTip';

enum Orders {
  first = 'first',
  second = 'second',
}

class RunnerService {
  private _firstRunner: Runner;

  private _secondRunner: Runner;

  private _firstRunnerData: IRunner;

  private _secondRunnerData: IRunner;

  private _combinedTip: CombinedTip;

  private _combinedTipData: ICombinedTip;

  private _runnerServiceState: IRunnerService;

  private _elements: HTMLElement[];

  constructor(runnerServiceState: IRunnerService) {
    this._runnerServiceState = { ...runnerServiceState };
    this._combinedTipData = setType(InterfacesNames.ICombinedTip, this._runnerServiceState);
    this._combinedTip = new CombinedTip(this._combinedTipData);
    this._firstRunnerData = this._setClass(
      setType(InterfacesNames.IRunner, this._runnerServiceState, 0), Orders.first,
    );
    this._secondRunnerData = this._setClass(
      setType(InterfacesNames.IRunner, this._runnerServiceState, 1), Orders.second,
    );
    this._firstRunner = new Runner(this._firstRunnerData);
    this._secondRunner = new Runner(this._secondRunnerData);
    this._elements = [];
    this._setElements();
  }

  public update(runnerServiceState: IRunnerService): void {
    this._runnerServiceState = { ...runnerServiceState };
    this._updateRunnersData();
    this._updateRunners();
    this._customizeDisplay();
    this._updateCombinedTip();
    this._setElements();
  }

  public getTemplate = (): HTMLElement[] => this._elements;

  get getFirstRunner(): Runner {
    return this._firstRunner;
  }

  get getSecondRunner(): Runner {
    return this._secondRunner;
  }

  get getSecondRunnerData(): IRunner {
    return this._secondRunnerData;
  }

  get getFirstRunnerData(): IRunner {
    return this._firstRunnerData;
  }

  get getRunnerServiceState(): IRunnerService {
    return this._runnerServiceState;
  }

  private _isOverlap(): boolean {
    const isRangeFalse = this._runnerServiceState.range === false;
    const isTipsFalse = this._runnerServiceState.tips === false;
    if (isRangeFalse || isTipsFalse) {
      return false;
    }
    const firstTipSize = this._firstRunner.getTipSize;
    const secondTipSize = this._secondRunner.getTipSize;
    const isXOverlap = firstTipSize.x + firstTipSize.width >= secondTipSize.x;
    const isYOverlap = firstTipSize.y + firstTipSize.height >= secondTipSize.y;

    if (this._runnerServiceState.orientation === Orientation.HORIZONTAL) {
      return isXOverlap;
    }
    return isYOverlap;
  }

  private _updateRunnersData(): void {
    this._firstRunnerData = this._setClass(
      setType(InterfacesNames.IRunner, this._runnerServiceState, 0), Orders.first,
    );
    this._secondRunnerData = this._setClass(
      setType(InterfacesNames.IRunner, this._runnerServiceState, 1), Orders.second,
    );
  }

  private _updateRunners(): void {
    this._firstRunner.update(this._firstRunnerData);
    this._secondRunner.update(this._secondRunnerData);
  }

  private _updateCombinedTip(): void {
    this._combinedTipData = setType(InterfacesNames.ICombinedTip, this._runnerServiceState);
    this._combinedTip.update(this._combinedTipData);
  }

  private _setElements(): void {
    if (this._runnerServiceState.range && !this._isOverlap()) {
      this._elements = [this._firstRunner.getTemplate(), this._secondRunner.getTemplate()];
    } else if (this._isOverlap()) {
      this._elements = [
        this._firstRunner.getTemplate(),
        this._secondRunner.getTemplate(),
        this._combinedTip.getTemplate(),
      ];
    } else {
      this._elements = [this._secondRunner.getTemplate()];
    }
  }

  private _customizeDisplay(): void {
    if (this._isOverlap()) {
      this._firstRunnerData.tips = false;
      this._secondRunnerData.tips = false;
      this._updateRunners();
    }
  }

  private _setClass(runnerData: IRunner, order: string): IRunner {
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
