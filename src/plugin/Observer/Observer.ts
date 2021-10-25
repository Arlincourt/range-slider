import { IEmit } from 'plugin/types/interfaces';

interface ISubscribes {
  [key: string]: Array<() => void>
}

class Observer {
  subscribes: ISubscribes;

  constructor() {
    this.subscribes = {};
  }

  subscribe(eventName: string, callback: (state?: IEmit) => void): void {
    if (this.subscribes[eventName]) {
      this.subscribes[eventName].push(callback);
      return;
    }

    this.subscribes[eventName] = [callback];
  }

  emit(eventName: string, state?: IEmit): void {
    if (this.subscribes[eventName]) {
      this.subscribes[eventName].forEach((callback: (state?: IEmit) => void) => {
        callback(state);
      });
    }
  }
}

export default Observer;

// emit('modelChange', data)
// observer.subscribe('modelChange', updateView)
