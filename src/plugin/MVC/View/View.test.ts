/**
 * @jest-environment jsdom
*/
import { IState } from '../../types/interfaces';
import View from './View'
import Classes from '../../types/classes'
import Orientation from '../../types/orientation'


describe('View module', () => {
  const rootElement: HTMLElement = document.createElement('div')
  let view: View;
  const viewData1: IState = {
    tips: true,
    orientation: Orientation.VERTICAL,
    value: [3, 12],
    min: 0,
    max: 100,
    step: 1,
    range: true
  }
  const viewData2: IState = {
    tips: false,
    orientation: Orientation.HORIZONTAL,
    value: [1, 24],
    min: 10,
    max: 70,
    step: 2,
    range: false
  }

  beforeEach(() => { 
    view = new View(rootElement, viewData1); 
  });
  test('should return html element with class and children', () => {
    expect(rootElement.contains(view.getTemplate)).toBe(true)
    expect(view.getTemplate.classList.contains(Classes.slider)).toBe(true)
    expect(view.getTemplate.children.length).toBe(1)
    expect(view.getTemplate.children[0].classList.contains(Classes.sliderBody)).toBe(true)
    expect(view.getTemplate.children[0].classList.contains(Classes.sliderBodyVertical)).toBe(true)
  })

  test('chould correct update state', () => {
    expect(view.getState).toEqual(viewData1)
    view.update(viewData2)
    expect(view.getState).not.toEqual(viewData1)
    expect(view.getState).toEqual(viewData2)
  })
})