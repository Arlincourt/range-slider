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
    orientation: Orientation.VERTICAL,
    possibleValues: {2: 2, 64: 64}
  }
  const edgeData2: IScale = {
    orientation: Orientation.HORIZONTAL,
    possibleValues: {0: 0, 20: 20, 40: 40, 80: 80}
  }

  beforeEach(() => { 
    scale = new Scale(edgeData1); 
  });

  test('should return html element with class and two child and correct update', () => {
    expect(scale.getTemplate().classList.contains(Classes.sliderScale)).toBe(true)
    expect(scale.getTemplate().children.length).toBe(2)
    
    scale.update(edgeData2)
    
    expect(scale.getTemplate().classList.contains(Classes.sliderScale)).toBe(true)
    expect(scale.getTemplate().children.length).toBe(4)
  })
})