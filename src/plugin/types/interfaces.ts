import Orientation from './orientation';

interface IPossibleValues {
  [key: number]: number
}

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
  value: number[],
  possibleValues: IPossibleValues;
  progressBar: boolean;
}

interface IScale {
  orientation: Orientation;
  possibleValues: IPossibleValues;
}

interface IEdgeService {
  orientation: Orientation;
  possibleValues: {}
}

interface IEdge {
  edge: number;
  offset: number;
  orientation: Orientation;
  edgeClassList: string[];
  valueClassList: string[];
}

interface IProgressBar {
  min: number;
  max: number;
  tips: boolean;
  range: boolean;
  orientation: Orientation;
  value: number[];
  progressBar: boolean;
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
  progressBar?: boolean;
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
  value: number[],
  possibleValues: IPossibleValues;
  progressBar: boolean;
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

interface IEmitEdge {
  value: number,
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
  IEmitEdge,
  ICombinedTip,
  IPossibleValues
};
