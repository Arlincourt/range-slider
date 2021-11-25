/**
 * @jest-environment jsdom
*/

import { IEdgeService } from "../../../types/interfaces";
import EdgeService from "./EdgeService";
import Orientation from '../../../types/orientation'
import Classes from "../../../types/classes";

describe('EdgeService module', () => {
  let edgeService: EdgeService;
  const edgeServiceData1: IEdgeService = {
    orientation: Orientation.VERTICAL,
    possibleValues: {16: 16, 32: 32, 48: 48, 64: 64, 80: 80}
  }
  const scale: HTMLElement = document.createElement('div')
  const edgeServiceData2: IEdgeService = {
    orientation: Orientation.HORIZONTAL,
    possibleValues: {16: 16, 32: 32, 48: 48, 64: 64, 80: 80, 96: 96}
  }

  beforeEach(() => { 
    edgeService = new EdgeService(edgeServiceData1, scale); 
  });

  test('should update private fields', () => {
    expect(edgeService.getState).not.toBe(edgeServiceData1)
    expect(edgeService.getState).toEqual(edgeServiceData1)
    expect(edgeService.getValueClass).toEqual([Classes.sliderValue, Classes.sliderValueVertical])
    expect(edgeService.getEdgeClass).toEqual([Classes.sliderEdge, Classes.sliderEdgeVertical])
    expect(edgeService.getElements.length).toBe(5)
    
    edgeService.update(edgeServiceData2)
    
    expect(edgeService.getState).not.toBe(edgeServiceData2)
    expect(edgeService.getState).toEqual(edgeServiceData2)
    expect(edgeService.getValueClass).toEqual([Classes.sliderValue, Classes.sliderValueHorizontal])
    expect(edgeService.getEdgeClass).toEqual([Classes.sliderEdge, Classes.sliderEdgeHorizontal])
    expect(edgeService.getElements.length).toBe(6)
  })
})