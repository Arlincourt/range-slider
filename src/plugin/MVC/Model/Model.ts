import IState from '../../types/IState';
import Observer from '../../Observer/Observer';

class Model {
  observer?: Observer;

  constructor() {

  }

  public getState(): IState {
    return { min: 2 };
  }

  public update(state: IState) {

  }
}

export default Model;
