import InterfacesNames from '../types/interfacesNames';
import { IRunnerService, IState } from 'plugin/types/interfaces';

function setType(type: string, parentType: IState | IRunnerService, count?: number): any {
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
          value: parentType.value[count]
        }
      }
      break;
    default: 
      return {...parentType}
  }
}

export default setType