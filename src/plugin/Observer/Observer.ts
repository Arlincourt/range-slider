import { IEmit, IEmitEdge } from '../types/interfaces';

interface ISubscribes {
  [key: string]: Array<() => void>;
}

class Observer {
  private _subscribes: ISubscribes;

  constructor() {
    this._subscribes = {};
  }

  public subscribe(eventName: string, callback: (state?: IEmit | IEmitEdge) => void): void {
    if (this._subscribes[eventName]) {
      this._subscribes[eventName].push(callback);
      return;
    }

    this._subscribes[eventName] = [callback];
  }

  public emit(eventName: string, state?: IEmit | IEmitEdge): void {
    if (this._subscribes[eventName]) {
      this._subscribes[eventName].forEach((callback: (state?: IEmit | IEmitEdge) => void) => {
        callback(state);
      });
    }
  }
}

export default Observer;
