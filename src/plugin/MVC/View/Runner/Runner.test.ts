/**
 * @jest-environment jsdom
*/
import Orientation from '../../../types/orientation';
import { IRunner } from '../../../types/interfaces';
import Classes from '../../../types/classes';
import Runner from './Runner';

describe('Runner module', () => {
  let runner: Runner;
  const runnerData1: IRunner = {
    tips: true,
    orientation: Orientation.VERTICAL,
    classList: [Classes.sliderItem, Classes.sliderItemTop, Classes.sliderItemVertical],
    value: 3
  }
  const runnerData2: IRunner = {
    tips: false,
    orientation: Orientation.HORIZONTAL,
    classList: [Classes.sliderItem, Classes.sliderItemLeft, Classes.sliderItemHorizontal],
    value: 4
  }

  beforeEach(() => { 
    runner = new Runner(runnerData1); 
  });

  test('should return html element with class and two childs', () => {
    expect(runner.getTemplate().classList.contains(Classes.sliderItem)).toBe(true);
    expect(runner.getTemplate().classList.contains(Classes.sliderItemTop)).toBe(true);  
    expect(runner.getTemplate().classList.contains(Classes.sliderItemVertical)).toBe(true);  
    expect(runner.getTemplate().children.length).toBe(2);  
  })
  
  test('should correct update: remove and add classes and delete one child', () => {
    runner.update(runnerData2);
    
    expect(runner.getTemplate().classList.contains(Classes.sliderItem)).toBe(true);
    expect(runner.getTemplate().classList.contains(Classes.sliderItemLeft)).toBe(true);
    expect(runner.getTemplate().classList.contains(Classes.sliderItemHorizontal)).toBe(true);
    expect(runner.getTemplate().classList.contains(Classes.sliderItemTop)).toBe(false);
    expect(runner.getTemplate().children.length).toBe(1);
  });
})