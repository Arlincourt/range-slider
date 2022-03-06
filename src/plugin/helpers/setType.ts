import InterfacesNames from '../types/interfacesNames';
import {
  IEdgeService, IRunnerService, IState,
} from '../types/interfaces';

// я не смог типизировать без any, так как поля сразу считаются ошибочными, если использовать
// Record<string, unknown>, или {[key : string]: number | string | boolean | Orientation }
// то есть если передается объект(а здесь всегда передается объект первым аргументом), то typescript
// ругается на то, что полей, которые я беру, могут не существовать в передаваемом объекте

// возвращаемое значение тоже any, так как если поставить тип IUniversalObjectType, то появятся
// ошибки в других файлах, которые используют эту функцию, так как возвращаемый тип не соответствует
// нужному(разные интерфейсы требуются для различных компонентов, использующих данную функцию).
// Тип обобщения(T) тоже не помогает

function setType(
  type: string, // eslint-disable-next-line
  parentType: IState | IRunnerService | IEdgeService | any, count?: number | string): any {
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
        orientation: parentType.orientation,
        possibleValues: parentType.possibleValues,
      };
    case InterfacesNames.IProgressBar:
      return {
        min: parentType.min,
        max: parentType.max,
        tips: parentType.tips,
        range: parentType.range,
        orientation: parentType.orientation,
        value: parentType.value,
        progressBar: parentType.progressBar,
      };
    case InterfacesNames.IScale:
      return {
        orientation: parentType.orientation,
        possibleValues: parentType.possibleValues,
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
