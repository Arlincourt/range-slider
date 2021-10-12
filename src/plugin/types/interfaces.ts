import Orientation from './orientation'

interface IProgressBar {
  min: number;
  max: number;
  tips: boolean;
  range: boolean;
  orientation: Orientation;
  value: number[];
}

interface IRunnerService {
  tips: boolean;
  range: boolean;
  orientation: Orientation;
  value: number[]
}

interface IRunner {
  tips: boolean;
  orientation: Orientation;
  value: number;
  classList: string[]
}

interface IOptions {
  min?: number;
  max?: number;
  tips?: boolean;
  step?: number;
  range?: boolean;
  orientation?: Orientation;
  value?: number[]
}

interface IState {
  min: number;
  max: number;
  tips: boolean;
  step: number;
  range: boolean;
  orientation: Orientation;
  value: number[]
}

export {IState, IOptions, IRunnerService, IRunner, IProgressBar};
