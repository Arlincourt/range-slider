import { IEmit } from '../types/interfaces';

interface ISubscribes {
  [key: string]: Array<() => void>
}

class Observer {
  subscribes: ISubscribes;

  constructor() {
    this.subscribes = {};
  }

  public subscribe(eventName: string, callback: (state?: IEmit) => void): void {
    if (this.subscribes[eventName]) {
      this.subscribes[eventName].push(callback);
      return;
    }

    this.subscribes[eventName] = [callback];
  }

  public emit(eventName: string, state?: IEmit): void {
    if (this.subscribes[eventName]) {
      this.subscribes[eventName].forEach((callback: (state?: IEmit) => void) => {
        callback(state);
      });
    }
  }
}

export default Observer;
