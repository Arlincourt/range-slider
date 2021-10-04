import IState from '../../types/IState';
import Observer from '../../Observer/Observer';

class View {
  public observer?: Observer;

  constructor(element: HTMLElement) {

  }

  public update(state: IState) {
    
  }
}

export default View;
