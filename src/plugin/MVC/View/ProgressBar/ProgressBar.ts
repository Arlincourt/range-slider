import Classes from "../../../types/classes"
import setType from '../../../helpers/setType';
import {IRunnerService, IProgressBar} from '../../../types/interfaces';
import RunnerService from '../RunnerService/RunnerService';
import InterfacesNames from '../../../types/interfacesNames';
import Orientation from "../../../types/orientation";

class ProgressBar {
  private progressBar: HTMLElement = document.createElement('div')
  private progressBarState: IProgressBar;
  private runnerService: RunnerService;
  private runnerServiceData: IRunnerService;

  constructor(progressBarState: IProgressBar) {
    this.progressBarState = progressBarState
    this.runnerServiceData = setType(InterfacesNames.IRunnerService, this.progressBarState)
    this.runnerService = new RunnerService(this.runnerServiceData)
    this.addClass()
    this.addElems()
    this.setStyle(this.progressBarState)
  }

  public update(progressBarState: IProgressBar): void {
    this.runnerServiceData = setType(InterfacesNames.IRunnerService, progressBarState)
    this.runnerService.update(this.runnerServiceData)
    if(this.progressBarState.orientation !== progressBarState.orientation) {
      this.addClass(progressBarState.orientation)
    }
    if(this.progressBarState.range !== progressBarState.range) {
      this.removeElems()
      this.addElems()
    }
    if(this.isPositionChanged(progressBarState)) {
      this.setStyle(progressBarState)
    }
    this.progressBarState = progressBarState
  }

  public getTemplate(): HTMLElement {
    return this.progressBar
  }

  private setStyle(progressBarState: IProgressBar): void {
    if(progressBarState.orientation === Orientation.VERTICAL) {
      this.progressBar.style.left = 0 + '%'
      this.progressBar.style.width = 0 + '%'
      this.progressBar.style.height = this.getSize(progressBarState) + '%'
      
      if(this.progressBarState.range === false) {
        this.progressBar.style.top = 0 + '%'
        return
      } 
      this.progressBar.style.top = this.getOffset(progressBarState) + '%'
      return
    }

    this.progressBar.style.top = 0 + '%'
    this.progressBar.style.height = 0 + '%'
    this.progressBar.style.width = this.getSize(progressBarState) + '%'
    
    if(this.progressBarState.range === false) {
      this.progressBar.style.left = 0 + '%'
      return
    }
    
    this.progressBar.style.left = this.getOffset(progressBarState) + '%'
  } 

  private getOffset(progressBarState: IProgressBar): number {
      const {max, min, value} = progressBarState
      const firstValue = value[0]
      const all = max - min;  
      const second = max - firstValue; 
      const secondOffset = (second / all) * 100;
      const firstOffset = 100 - secondOffset;
      return firstOffset
  }

  private getSize(progressBarState: IProgressBar): number {
    const size = 3

    // min: 7
    // max: 104
    // value[12, 90]
    // const intervalValue - (max - min) 
    // 12 - firstRunner
    // 90 - secondRunner
    // if(range === false) ((value[1] - min) / max) * 100 
    // if(range === true) ((value[0] - min) / max) * 100 

    return size
  }

  private isPositionChanged(progressBarState: IProgressBar): boolean {
    let isChanged = false

    if(this.progressBarState.min !== progressBarState.min) {
      isChanged = true
    }
    if(this.progressBarState.max !== progressBarState.max) {
      isChanged = true
    }
    this.progressBarState.value.forEach((value, idx) => {
      if(value !== progressBarState.value[idx]) {
        isChanged = true 
      }
    })

    return isChanged
  }

  private addElems(): void {
    this.runnerService.getTemplate().forEach((runner) => {
      this.progressBar.append(runner)
    })
  }

  private removeElems(): void {
    this.progressBar.innerHTML = ''
  }

  private addClass(orientation?: Orientation): void {
    this.progressBar.className = ''
    this.progressBar.classList.add(Classes.sliderActiveLine)
    if(orientation) {
      if(orientation === Orientation.VERTICAL) {
        this.progressBar.classList.add(Classes.sliderActiveLineVertical)
        return
      }
      
      this.progressBar.classList.add(Classes.sliderActiveLineHorizontal)
      return
    }

    if(this.progressBarState.orientation === Orientation.VERTICAL) {
      this.progressBar.classList.add(Classes.sliderActiveLineVertical)
    } else {
      this.progressBar.classList.add(Classes.sliderActiveLineHorizontal)
    }
  }
}

export default ProgressBar