import {IState} from '../../types/interfaces';
import Observer from '../../Observer/Observer';
import Orientation from '../../types/orientation';
import {IOptions} from '../../types/interfaces';

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
    this.state = {...this.state, ...options}
    setTimeout(() => {
      console.log(this.state)
    })
  }

  public getState(): IState {
    return this.state;
  }

  public update(state: IState) {

    this.observer?.emit('modelChange')
  }
}

export default Model;
