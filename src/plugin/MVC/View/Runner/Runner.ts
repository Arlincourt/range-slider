import Tip from '../Tip/Tip'
import Point from '../Point/Point'
import classes from '../../../types/classes'
import {IRunner} from '../../../types/interfaces'


class Runner {
  private tip: Tip = new Tip();
  private point: Point = new Point();
  private runner: HTMLElement = document.createElement('div')

  constructor(options: IRunner) {
    this.init()
  }

  public getTemplate(): HTMLElement {
    return this.runner
  }

  private init(): void {
    this.addElems()
  }
  
  private addElems(): void {
    this.runner.append(this.tip.getTemplate())
    this.runner.append(this.point.getTemplate())
  }
  
  private addClass(classNames: string | string[]): void {
    this.runner.className = ''
    if(typeof classNames === 'string') {
      this.runner.classList.add(classNames)
    } else {
      classNames.forEach((className) => {
        this.runner.classList.add(className)
      })
    }
  }
}

export default Runner