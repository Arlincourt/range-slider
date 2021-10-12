import Tip from '../Tip/Tip'
import Point from '../Point/Point'
import {IRunner} from '../../../types/interfaces'


class Runner {
  private tip: Tip = new Tip();
  private point: Point = new Point();
  private runner: HTMLElement = document.createElement('div')
  private runnerState: IRunner;

  constructor(options: IRunner) {
    this.runnerState = options
    this.init()
  }

  public getTemplate(): HTMLElement {
    return this.runner
  }
  
  public update(newState: IRunner): void {
    this.runnerState = newState
    this.addClass(this.runnerState.classList)
    this.setTipText(this.runnerState.value)
    this.removeElems()
    this.addElems()
  }
  
  private init(): void {
    this.addElems()
    this.setTipText(this.runnerState.value)
    this.addClass(this.runnerState.classList)
  }

  private removeElems(): void {
    if(!this.runnerState.tips) {
      this.tip.remove()
    }
  }
  
  private addElems(): void {
    if(this.isTip()) {
      this.runner.append(this.tip.getTemplate())
    }
    if(this.isPoint()) {
      this.runner.append(this.point.getTemplate())
    }
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

  private setTipText(text: number): void {
    this.tip.update(text)
  }

  private isTip(): boolean {
    let isTip = true 
    if(this.runnerState.tips) {
      isTip = true
    } else {
      isTip = false
    }

    isTip = !this.runner.contains(this.tip.getTemplate()) && isTip
    return isTip
  }

  private isPoint(): boolean {
    return !this.runner.contains(this.point.getTemplate())
  }
}

export default Runner