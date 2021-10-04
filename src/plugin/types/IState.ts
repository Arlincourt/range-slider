import Orientation from './orientation'

interface IState {
  min?: number;
  max: number;
  tips: boolean;
  step: number;
  range: boolean;
  orientation: Orientation;
  value: number[]
}

export default IState;
