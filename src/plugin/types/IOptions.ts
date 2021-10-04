import Orientation from './orientation'

interface IOptions {
  min?: number;
  max?: number;
  tips?: boolean;
  step?: number;
  range?: boolean;
  orientation?: Orientation;
  value?: number[]
}

export default IOptions;
