/**
 * @jest-environment jsdom
*/

import Orientation from '../../../types/orientation';
import { IEdge } from '../../../types/interfaces';
import Edge from './Edge'
import Classes from '../../../types/classes'

describe('Edge module', () => {
  let edge: Edge;
  const edgeData: IEdge = {
    edge: 0,
    orientation: Orientation.VERTICAL,
    classList: [Classes.sliderEdge, Classes.sliderEdgeTop]
  }

  beforeEach(() => { 
    edge = new Edge(edgeData); 
  });

  test('should return html element with class', () => {

    expect(edge.getTemplate().classList.contains(Classes.sliderEdgeTop)).toBe(true)
    expect(edge.getTemplate().classList.contains(Classes.sliderEdge)).toBe(true)
  })

  test('should set text', () => {
    expect(edge.getTemplate().textContent).toBe('0')
  })

  test('should update class and text', () => {
    const edgeData2 = {
      edge: 66,
      orientation: Orientation.HORIZONTAL,
      classList: [Classes.sliderEdge, Classes.sliderEdgeLeft]
    }

    expect(edge.getTemplate().classList.contains(Classes.sliderEdgeTop)).toBe(true)
    expect(edge.getTemplate().classList.contains(Classes.sliderEdge)).toBe(true)
    expect(edge.getTemplate().textContent).toBe('0')
    
    edge.update(edgeData2)
    
    expect(edge.getTemplate().classList.contains(Classes.sliderEdgeLeft)).toBe(true)
    expect(edge.getTemplate().classList.contains(Classes.sliderEdge)).toBe(true)
    expect(edge.getTemplate().textContent).toBe('66')
  })
})