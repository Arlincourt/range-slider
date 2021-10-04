import IState from 'plugin/types/IState';

interface ISubscribes {
  [key: string]: Array<() => any>
}

class Observer {
  subscribes: ISubscribes;

  constructor() {
    this.subscribes = {};
  }

  subscribe(eventName: string, callback: (state?: IState) => void): void {
    if (this.subscribes[eventName]) {
      this.subscribes[eventName].push(callback);
      return;
    }

    this.subscribes[eventName] = [callback];
  }

  emit(eventName: string, state?: IState): void {
    if (this.subscribes[eventName]) {
      this.subscribes[eventName].forEach((callback: (state?: IState) => any) => {
        callback(state);
      });
    }
  }
}

export default Observer;

// emit('modelChange', data)
// observer.subscribe('modelChange', updateView)
