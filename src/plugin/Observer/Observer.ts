import IState from "plugin/types/IState";

interface ISubscribes {
  [key: string]: Array<() => any>
}

class Observer {
  subscribes: ISubscribes;
  constructor() {
    this.subscribes = {}
  }

  subscribe(eventName: string, callback: () => any) {
    if(this.subscribes[eventName]) {
      this.subscribes[eventName].push(callback)
      return
    }

    this.subscribes[eventName] = [callback]
  }

  emit(eventName: string, data: IState) {
    if(this.subscribes[eventName]) {
      this.subscribes[eventName].forEach((callback: (data: IState) => any) => {
        callback(data)
      })
    }
  }
}

export default Observer

//emit('modelChange', data)
//observer.subscribe('modelChange', updateView)