import Runner from '../Runner/Runner'
import {IRunner, IRunnerService} from '../../../types/interfaces'
import setType from '../../../helpers/setType';
import InterfacesNames from '../../../types/interfacesNames';
import Orientation from '../../../types/orientation';
import Classes from '../../../types/classes';

enum Orders {
  first = 'first',
  second = 'second',
}


class RunnerService {
  private firstRunner: Runner;
  private secondRunner: Runner;
  private firstRunnerData: IRunner;
  private secondRunnerData: IRunner;
  private runnerServiceState: IRunnerService;
   
  constructor(runnerServiceState: IRunnerService) {
    this.runnerServiceState = runnerServiceState
    this.firstRunnerData = this.setClass(setType(InterfacesNames.IRunner, this.runnerServiceState, 0), Orders.first)
    this.secondRunnerData = this.setClass(setType(InterfacesNames.IRunner, this.runnerServiceState, 1), Orders.second)
    this.firstRunner = new Runner(this.firstRunnerData)
    this.secondRunner = new Runner(this.secondRunnerData)
  }
  
  public update(runnerServiceState: IRunnerService): void {
    this.runnerServiceState = runnerServiceState
    this.firstRunnerData = this.setClass(setType(InterfacesNames.IRunner, this.runnerServiceState, 0), Orders.first)
    this.secondRunnerData = this.setClass(setType(InterfacesNames.IRunner, this.runnerServiceState, 1), Orders.second)
    this.firstRunner.update(this.firstRunnerData)
    this.secondRunner.update(this.secondRunnerData)
  }

  public getTemplate(): HTMLElement[] {
    if(this.runnerServiceState.range) {
      return [this.firstRunner.getTemplate(), this.secondRunner.getTemplate()]
    }
    return [this.firstRunner.getTemplate()]
  }

  private setClass(runnerData: IRunner, order: string): IRunner {
    const isFirst = order === Orders.first
    if(runnerData.orientation === Orientation.VERTICAL) {

      runnerData.classList = [Classes.sliderItem, Classes.sliderItemVertical]

      if(isFirst) {
        runnerData.classList.push(Classes.sliderItemTop)
      } else {
        runnerData.classList.push(Classes.sliderItemBottom)
      }

    } else {
      runnerData.classList = [Classes.sliderItem, Classes.sliderItemHorizontal]

      if(isFirst) {
        runnerData.classList.push(Classes.sliderItemLeft)
      } else {
        runnerData.classList.push(Classes.sliderItemRight)
      }

    }
    return runnerData
  }
}

export default RunnerService

// Принимать параметры и в соответсвии с ними делать либо два бегунка либо нет
// Также настраивать Видимость Подсказок. Полностью управлять вертикальным или горизонтальным положением
// Менять текст у подсказок. Иметь метод возвращения HTML-разметки. Иметь метод полного обновления
// Кнопка должна при клике эмиитить событие передавая данные, Главный Вид должен принимать это событие 
// и эмитить изменения, Модель должна полностью рассчитать все и эмитить изменения, Вид должен принять эти 
// Данные и обновить на основе этих данных Два СабВида: Интервал и Раннер. Эти два СабВида должны внутри 
// себя изменить другие СабВиды.