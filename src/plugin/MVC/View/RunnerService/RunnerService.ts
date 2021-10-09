import Runner from '../Runner/Runner'
import {IRunnerService} from '../../../types/interfaces'
import setType from '../../../helpers/setType';
import InterfacesNames from '../../../types/interfacesNames';


class RunnerService {
  private firstRunner: Runner;
  private secondRunner: Runner;
   
  constructor(options: IRunnerService) {
    this.firstRunner = new Runner(setType(InterfacesNames.IRunner, options, 0))
    this.secondRunner = new Runner(setType(InterfacesNames.IRunner, options, 1))
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