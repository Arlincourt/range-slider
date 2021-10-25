import Edge from '../Edge/Edge';
import { IEdge, IEdgeService } from '../../../types/interfaces';
import setType from '../../../helpers/setType';
import Orientation from '../../../types/orientation';
import InterfacesNames from '../../../types/interfacesNames';
import Classes from '../../../types/classes';
import copyObject from '../../../helpers/copyObject';

enum Orders {
  max = 'max',
  min = 'min'
}

class EdgeService {
  private minEdge: Edge

  private minEdgeData: IEdge

  private maxEdge: Edge

  private maxEdgeData: IEdge

  private edgeServiceState: IEdgeService

  constructor(edgeServiceState: IEdgeService) {
    this.edgeServiceState = copyObject(edgeServiceState);
    this.minEdgeData = this.setClass(setType(InterfacesNames.IEdge, this.edgeServiceState, 'min'), Orders.min);
    this.maxEdgeData = this.setClass(setType(InterfacesNames.IEdge, this.edgeServiceState, 'max'), Orders.max);
    this.minEdge = new Edge(this.minEdgeData);
    this.maxEdge = new Edge(this.maxEdgeData);
  }

  public update(edgeServiceState: IEdgeService): void {
    this.edgeServiceState = copyObject(edgeServiceState);
    this.minEdgeData = this.setClass(setType(InterfacesNames.IEdge, this.edgeServiceState, 'min'), Orders.min);
    this.maxEdgeData = this.setClass(setType(InterfacesNames.IEdge, this.edgeServiceState, 'max'), Orders.max);
    this.minEdge.update(this.minEdgeData);
    this.maxEdge.update(this.maxEdgeData);
  }

  get getEdgeServiceState(): IEdgeService {
    return this.edgeServiceState;
  }

  get getMinEdge(): Edge {
    return this.minEdge;
  }

  get getMaxEdge(): Edge {
    return this.maxEdge;
  }

  get getMinEdgeData(): IEdge {
    return this.minEdgeData;
  }

  get getMaxEdgeData(): IEdge {
    return this.maxEdgeData;
  }

  public getTemplate(): HTMLElement[] {
    return [this.minEdge.getTemplate(), this.maxEdge.getTemplate()];
  }

  private setClass(edgeData: IEdge, order: string): IEdge {
    const isMin = order === Orders.min;
    if (edgeData.orientation === Orientation.VERTICAL) {
      /* eslint no-param-reassign: "error" */
      edgeData.classList = [Classes.sliderEdge];

      if (isMin) {
        edgeData.classList.push(Classes.sliderEdgeTop);
      } else {
        edgeData.classList.push(Classes.sliderEdgeBottom);
      }
    } else {
      /* eslint no-param-reassign: "error" */
      edgeData.classList = [Classes.sliderEdge];

      if (isMin) {
        edgeData.classList.push(Classes.sliderEdgeLeft);
      } else {
        edgeData.classList.push(Classes.sliderEdgeRight);
      }
    }
    return edgeData;
  }
}

export default EdgeService;
