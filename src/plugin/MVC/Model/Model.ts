import { IState, IOptions, IEmit } from '../../types/interfaces';
import Observer from '../../Observer/Observer';
import Orientation from '../../types/orientation';

class Model {
  public observer?: Observer;

  private state: IState = {
    range: false,
    tips: true,
    max: 100,
    min: 0,
    orientation: Orientation.HORIZONTAL,
    step: 1,
    value: [0, 100],
  };

  constructor(options: IOptions) {
    this.state = { ...this.state, ...options };
    setTimeout(() => {
      console.log(this.state);
    });
  }

  public getState(): IState {
    return this.state;
  }

  public update(state: IEmit) {
    console.log(state)
    this.observer?.emit('modelChange');
  }
}

export default Model;
