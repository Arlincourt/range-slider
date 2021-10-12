import Edge from "../Edge/Edge"
import {IEdge, IEdgeService} from '../../../types/interfaces'
import setType from "../../../helpers/setType"
import Orientation from "../../../types/orientation"
import InterfacesNames from "../../../types/interfacesNames"
import Classes from "../../../types/classes"


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
    this.edgeServiceState = edgeServiceState
    this.minEdgeData = this.setClass(setType(InterfacesNames.IEdge, this.edgeServiceState, 0), Orders.min)
    this.maxEdgeData = this.setClass(setType(InterfacesNames.IEdge, this.edgeServiceState, 1), Orders.max)
    this.minEdge = new Edge(this.minEdgeData)
    this.maxEdge = new Edge(this.maxEdgeData)
  }

  public update(edgeServiceState: IEdgeService): void {
    this.edgeServiceState = edgeServiceState
    this.minEdgeData = this.setClass(setType(InterfacesNames.IRunner, this.edgeServiceState, 0), Orders.min)
    this.maxEdgeData = this.setClass(setType(InterfacesNames.IRunner, this.edgeServiceState, 1), Orders.max)
    this.minEdge.update(this.minEdgeData)
    this.maxEdge.update(this.maxEdgeData)
  }

  public getTemplate(): HTMLElement[] {
    return [this.minEdge.getTemplate(), this.maxEdge.getTemplate()]
  }

  private setClass(edgeData: IEdge, order: string): IEdge {
    const isMin = order === Orders.min
    if(edgeData.orientation === Orientation.VERTICAL) {

      edgeData.classList = [Classes.sliderEdge]

      if(isMin) {
        edgeData.classList.push(Classes.sliderEdgeTop)
      } else {
        edgeData.classList.push(Classes.sliderEdgeBottom)
      }

    } else {
      edgeData.classList = [Classes.sliderEdge]

      if(isMin) {
        edgeData.classList.push(Classes.sliderEdgeLeft)
      } else {
        edgeData.classList.push(Classes.sliderEdgeRight)
      }

    }
    return edgeData
  }
}

export default EdgeService