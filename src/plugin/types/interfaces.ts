import Orientation from './orientation';

interface ICombinedTip {
  value: number[];
  orientation: Orientation
}

interface IInterval {
  min: number;
  max: number;
  tips: boolean;
  step: number;
  range: boolean;
  orientation: Orientation;
  value: number[]
}

interface IScale {
  min: number;
  max: number;
  orientation: Orientation;
}

interface IEdgeService {
  min: number;
  max: number;
  orientation: Orientation;
}

interface IEdge {
  edge: number;
  orientation: Orientation;
  classList: string[]
}

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

interface IEmit {
  clientX: number;
  clientY: number;
  clientWidth: number;
  clientHeight: number;
  offsetX: number;
  offsetY: number;
  mouseDown: boolean;
}

export {
  IState,
  IOptions,
  IRunnerService,
  IRunner,
  IProgressBar,
  IEdge,
  IEdgeService,
  IScale,
  IInterval,
  IEmit,
  ICombinedTip
};
