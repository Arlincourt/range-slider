/**
 * @jest-environment jsdom
*/
import Orientation from '../../../types/orientation';
import { IInterval } from '../../../types/interfaces';
import Classes from '../../../types/classes'
import Interval from './Interval';

describe('Interval module', () => {
  let interval: Interval;
  const intervalData1: IInterval = {
    min: -3,
    max: 19,
    tips: true,
    step: 3,
    range: true,
    orientation: Orientation.VERTICAL,
    value: [2, 6]
  }
  const intervalData2: IInterval = {
    min: 0,
    max: 29,
    tips: false,
    step: 1,
    range: false,
    orientation: Orientation.HORIZONTAL,
    value: [1, 12]
  }

  beforeEach(() => { 
    interval = new Interval(intervalData1); 
  });
  test('should return html element with children and class', () => {
    expect(interval.getIntervalState).toEqual(intervalData1)
    expect(interval.getTemplate().classList.contains(Classes.sliderBody)).toBe(true)
    expect(interval.getTemplate().classList.contains(Classes.sliderBodyVertical)).toBe(true)
    expect(interval.getTemplate().children.length).toBe(2)
    expect(interval.getTemplate().children[0].classList.contains(Classes.sliderLine)).toBe(true)
    expect(interval.getTemplate().children[0].classList.contains(Classes.sliderLineVertical)).toBe(true)
  })
  
  test('should correct update', () => {
    interval.update(intervalData2)
    expect(interval.getIntervalState).toEqual(intervalData2)
    expect(interval.getIntervalState).not.toBe(intervalData1)
    expect(interval.getTemplate().classList.contains(Classes.sliderBody)).toBe(true)
    expect(interval.getTemplate().classList.contains(Classes.sliderBodyVertical)).toBe(false)
    expect(interval.getTemplate().classList.contains(Classes.sliderBodyHorizontal)).toBe(true)
    expect(interval.getTemplate().children.length).toBe(2)
    expect(interval.getTemplate().children[0].classList.contains(Classes.sliderLine)).toBe(true)
    expect(interval.getTemplate().children[0].classList.contains(Classes.sliderLineVertical)).toBe(false)
    expect(interval.getTemplate().children[0].classList.contains(Classes.sliderLineHorizontal)).toBe(true)
  })
})