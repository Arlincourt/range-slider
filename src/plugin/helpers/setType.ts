import InterfacesNames from '../types/interfacesNames';
import { IEdgeService, IRunnerService, IState } from 'plugin/types/interfaces';
import Orientation from 'plugin/types/orientation';

function setType(type: string, parentType: IState | IRunnerService | IEdgeService | any, count?: number | string): any {
  switch(type) {
    case InterfacesNames.IRunnerService:
      return {
        tips: parentType.tips,
        range: parentType.range,
        orientation: parentType.orientation,
        value: parentType.value
      }
      break;
    case InterfacesNames.IRunner:
      if(count) {
        return {
          tips: parentType.tips,
          range: parentType.range,
          orientation: parentType.orientation,
          value: parentType.value[count],
          classList: []
        }
      }
      break
    case InterfacesNames.IEdge:
      if(count) {
        return {
          edge: parentType[count],
          classList: [],
          orientation: parentType.orientation
        }
      }
      break;
    default: 
      return {...parentType}
  }
}

export default setType