/**
 * @jest-environment jsdom
*/

import ProgressBar from './ProgressBar'
import Classes from '../../../types/classes'
import {IProgressBar} from '../../../types/interfaces'
import Orientation from '../../../types/orientation'


describe('ProgressBar module', () => {
  let progressBar: ProgressBar;
  const progressBarData1: IProgressBar = {
    tips: true,
    orientation: Orientation.VERTICAL,
    min: 0,
    max: 100,
    value: [15, 70],
    range: true 
  }
  const progressBarData2: IProgressBar = {
    tips: false,
    orientation: Orientation.HORIZONTAL,
    min: 10,
    max: 90,
    value: [25, 60],
    range: false
  }

  beforeEach(() => { 
    progressBar = new ProgressBar(progressBarData1); 
  });

  test('should return html element with class and childs', () => {
    expect(progressBar.getTemplate().classList.contains(Classes.sliderActiveLine)).toBe(true)
    expect(progressBar.getTemplate().classList.contains(Classes.sliderActiveLineVertical)).toBe(true)
    expect(progressBar.getTemplate().children.length).toBe(2)
    expect(progressBar.getTemplate().children[0].classList.contains(Classes.sliderItem)).toBe(true)
    expect(progressBar.getTemplate().children[0].classList.contains(Classes.sliderItemVertical)).toBe(true)
    expect(progressBar.getTemplate().children[0].classList.contains(Classes.sliderItemTop)).toBe(true)
  })
  test('should correct update: delete child and removes and add classes', () => {
    progressBar.update(progressBarData2)
    expect(progressBar.getTemplate().style.top).toBe('0%')
    expect(progressBar.getTemplate().style.height).toBe('8px')
    expect(progressBar.getTemplate().style.width).toBe('62.5%')
    expect(progressBar.getTemplate().style.left).toBe('18.75%')
    expect(progressBar.getTemplate().classList.contains(Classes.sliderActiveLine)).toBe(true)
    expect(progressBar.getTemplate().classList.contains(Classes.sliderActiveLineHorizontal)).toBe(true)
    expect(progressBar.getTemplate().classList.contains(Classes.sliderActiveLineVertical)).toBe(false)
    expect(progressBar.getTemplate().children.length).toBe(1)
    expect(progressBar.getTemplate().children[0].classList.contains(Classes.sliderItem)).toBe(true)
    expect(progressBar.getTemplate().children[0].classList.contains(Classes.sliderItemVertical)).toBe(false)
    expect(progressBar.getTemplate().children[0].classList.contains(Classes.sliderItemHorizontal)).toBe(true)
    expect(progressBar.getTemplate().children[0].classList.contains(Classes.sliderItemRight)).toBe(true)
    expect(progressBar.getTemplate().children[0].classList.contains(Classes.sliderItemTop)).toBe(false)
  })
})