import { IEmit, IEmitEdge } from '../types/interfaces';

interface ISubscribes {
  [key: string]: Array<() => void>;
}

class Observer {
  subscribes: ISubscribes;

  constructor() {
    this.subscribes = {};
  }

  public subscribe(eventName: string, callback: (state?: IEmit | IEmitEdge) => void): void {
    if (this.subscribes[eventName]) {
      this.subscribes[eventName].push(callback);
      return;
    }

    this.subscribes[eventName] = [callback];
  }

  public emit(eventName: string, state?: IEmit | IEmitEdge): void {
    if (this.subscribes[eventName]) {
      this.subscribes[eventName].forEach((callback: (state?: IEmit | IEmitEdge) => void) => {
        callback(state);
      });
    }
  }
}

export default Observer;
