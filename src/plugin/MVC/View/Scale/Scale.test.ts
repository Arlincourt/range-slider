/**
 * @jest-environment jsdom
*/

import { IScale } from '../../../types/interfaces';
import Scale from './Scale'
import Classes from '../../../types/classes'
import Orientation from '../../../types/orientation'

describe('Scale Module', () => {
  let scale: Scale;
  const edgeData1: IScale = {
    min: 0,
    max: 100,
    orientation: Orientation.VERTICAL
  }
  const edgeData2: IScale = {
    min: 10,
    max: 100,
    orientation: Orientation.HORIZONTAL
  }

  beforeEach(() => { 
    scale = new Scale(edgeData1); 
  });

  test('should return html element with class and two child and correct update', () => {
    expect(scale.getTemplate().classList.contains(Classes.sliderScale)).toBe(true)
    expect(scale.getTemplate().classList.contains(Classes.sliderScaleVertical)).toBe(true)
    expect(scale.getTemplate().classList.contains(Classes.sliderScaleHorizontal)).toBe(false)
    expect(scale.getTemplate().children.length).toBe(2)
    
    scale.update(edgeData2)
    
    expect(scale.getTemplate().classList.contains(Classes.sliderScale)).toBe(true)
    expect(scale.getTemplate().classList.contains(Classes.sliderScaleVertical)).toBe(false)
    expect(scale.getTemplate().classList.contains(Classes.sliderScaleHorizontal)).toBe(true)
    expect(scale.getTemplate().children.length).toBe(2)
  })
})