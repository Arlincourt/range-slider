/**
 * @jest-environment jsdom
*/

import Orientation from '../../../types/orientation';
import { IEdge } from '../../../types/interfaces';
import Edge from './Edge'
import Classes from '../../../types/classes'

describe('Edge module', () => {
  let edge: Edge;
  const edgeData1: IEdge = {
    edge: 0,
    offset: 13,
    orientation: Orientation.VERTICAL,
    edgeClassList: [Classes.sliderEdge, Classes.sliderEdgeVertical],
    valueClassList: [Classes.sliderValue, Classes.sliderValueVertical]
  }
  const edgeData2: IEdge = {
    edge: 3,
    offset: 19,
    orientation: Orientation.HORIZONTAL,
    edgeClassList: [Classes.sliderEdge, Classes.sliderEdgeHorizontal],
    valueClassList: [Classes.sliderValue, Classes.sliderValueHorizontal]
  }

  beforeEach(() => { 
    edge = new Edge(edgeData1); 
  });

  test('should return html element with class', () => {

    expect(edge.getTemplate().classList.contains(Classes.sliderEdge)).toBe(true)
    expect(edge.getTemplate().classList.contains(Classes.sliderEdgeVertical)).toBe(true)
    expect(edge.getTemplate().children[0].classList.contains(Classes.sliderValue)).toBe(true)
    expect(edge.getTemplate().children[0].classList.contains(Classes.sliderValueVertical)).toBe(true)
  })

  test('should set text', () => {
    expect(edge.getTemplate().children[0].textContent).toBe('0')
  })

  test('should update class and text', () => {
    edge.update(edgeData2)

    expect(edge.getTemplate().classList.contains(Classes.sliderEdge)).toBe(true)
    expect(edge.getTemplate().classList.contains(Classes.sliderEdgeHorizontal)).toBe(true)
    expect(edge.getTemplate().children[0].classList.contains(Classes.sliderValue)).toBe(true)
    expect(edge.getTemplate().children[0].classList.contains(Classes.sliderValueHorizontal)).toBe(true)
    expect(edge.getTemplate().children[0].textContent).toBe('3')
  })
})