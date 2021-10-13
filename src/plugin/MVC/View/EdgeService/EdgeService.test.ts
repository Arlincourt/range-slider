/**
 * @jest-environment jsdom
*/

import { IEdgeService } from "../../../types/interfaces";
import EdgeService from "./EdgeService";
import Orientation from '../../../types/orientation'

describe('EdgeService module', () => {
  let edgeService: EdgeService;
  const edgeServiceData1: IEdgeService = {
    min: 0,
    max: 100,
    orientation: Orientation.VERTICAL,
  }
  const edgeServiceData2: IEdgeService = {
    min: 10,
    max: 80,
    orientation: Orientation.HORIZONTAL,
  }

  beforeEach(() => { 
    edgeService = new EdgeService(edgeServiceData1); 
  });

  test('should update private fields', () => {
    const minEdge = {...edgeService.getMinEdge}
    const maxEdge = {...edgeService.getMaxEdge}
    const maxEdgeData = {...edgeService.getMaxEdgeData}
    const minEdgeData = {...edgeService.getMinEdgeData}
    const edgeServiceState = {...edgeService.getEdgeServiceState}

    expect(edgeServiceState).toEqual(edgeServiceData1)

    edgeService.update(edgeServiceData2)

    expect(edgeService.getEdgeServiceState).not.toEqual(edgeServiceState)
    expect(edgeService.getEdgeServiceState).toEqual(edgeServiceData2)
    expect(edgeService.getMinEdge).not.toEqual(minEdge)
    expect(edgeService.getMaxEdge).not.toEqual(maxEdge)
    expect(edgeService.getMaxEdgeData).not.toEqual(maxEdgeData)
    expect(edgeService.getMinEdgeData).not.toEqual(minEdgeData)
  })
})