import setType from "./setType";
import InterfacesNames from '../types/interfacesNames'
import Orientation from "../types/orientation";
import { IEdgeService, IEdge } from 'plugin/types/interfaces';

describe('setType module', () => {

  test('should return objects with the fields: edge, orientation, classList', () => {
    const edgeData: IEdgeService = {
      min: 0,
      max: 100,
      orientation: Orientation.VERTICAL
    }

    const minEdgeEqual: IEdge = {
      edge: 0,
      classList: [],
      orientation: Orientation.VERTICAL
    }
    const maxEdgeEqual: IEdge = {
      edge: 100,
      classList: [],
      orientation: Orientation.VERTICAL
    }

    const minEdgeResult = setType(InterfacesNames.IEdge, edgeData, 'min')
    const maxEdgeResult = setType(InterfacesNames.IEdge, edgeData, 'max')

    expect(minEdgeResult).toEqual(minEdgeEqual)
    expect(maxEdgeResult).toEqual(maxEdgeEqual)
    expect(maxEdgeResult).not.toEqual(minEdgeResult)
  })
})