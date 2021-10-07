import Orientation from './orientation'

interface IRunnerService {
  tips: boolean;
  range: boolean;
  orientation: Orientation;
  value: number[]
}

export default IRunnerService