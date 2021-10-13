/**
 * @jest-environment jsdom
*/

import { IInfo } from '../../../types/interfaces';
import Info from './Info'
import Classes from '../../../types/classes'
import Orientation from '../../../types/orientation'

describe('Info Module', () => {
  let info: Info;
  const edgeData1: IInfo = {
    min: 0,
    max: 100,
    orientation: Orientation.VERTICAL
  }
  const edgeData2: IInfo = {
    min: 10,
    max: 100,
    orientation: Orientation.HORIZONTAL
  }

  beforeEach(() => { 
    info = new Info(edgeData1); 
  });

  test('should return html element with class and two child and correct update', () => {
    expect(info.getTemplate().classList.contains(Classes.sliderInfo)).toBe(true)
    expect(info.getTemplate().classList.contains(Classes.sliderInfoVertical)).toBe(true)
    expect(info.getTemplate().classList.contains(Classes.sliderInfoHorizontal)).toBe(false)
    expect(info.getTemplate().children.length).toBe(2)
    
    info.update(edgeData2)
    
    expect(info.getTemplate().classList.contains(Classes.sliderInfo)).toBe(true)
    expect(info.getTemplate().classList.contains(Classes.sliderInfoVertical)).toBe(false)
    expect(info.getTemplate().classList.contains(Classes.sliderInfoHorizontal)).toBe(true)
    expect(info.getTemplate().children.length).toBe(2)
  })
})