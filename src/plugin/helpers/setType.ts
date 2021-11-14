import InterfacesNames from '../types/interfacesNames';
import { IEdgeService, IRunnerService, IState } from '../types/interfaces';

function setType(
  type: string, parentType: IState | IRunnerService | IEdgeService | any, count?: number | string,
): any | void {
  switch (type) {
    case InterfacesNames.IRunnerService:
      return {
        tips: parentType.tips,
        range: parentType.range,
        orientation: parentType.orientation,
        value: parentType.value,
      };
    case InterfacesNames.IRunner:
      if (count !== undefined) {
        return {
          tips: parentType.tips,
          range: parentType.range,
          orientation: parentType.orientation,
          value: parentType.value[count],
          classList: [],
        };
      }
      break;
    case InterfacesNames.IEdge:
      if (count) {
        return {
          edge: parentType[count],
          classList: [],
          orientation: parentType.orientation,
        };
      }
      break;
    case InterfacesNames.IEdgeService:
      return {
        max: parentType.max,
        min: parentType.min,
        orientation: parentType.orientation,
        possibleValues: parentType.possibleValues
      };
    case InterfacesNames.IProgressBar:
      return {
        min: parentType.min,
        max: parentType.max,
        tips: parentType.tips,
        range: parentType.range,
        orientation: parentType.orientation,
        value: parentType.value,
        progressBar: parentType.progressBar
      };
      case InterfacesNames.IScale:
        return {
          min: parentType.min,
          max: parentType.max,
          orientation: parentType.orientation,
          possibleValues: parentType.possibleValues
        };
      case InterfacesNames.ICombinedTip:
        return {
          orientation: parentType.orientation,
          value: parentType.value,
        };
    default:
      return { ...parentType };
  }
  return { ...parentType };
}

export default setType;
