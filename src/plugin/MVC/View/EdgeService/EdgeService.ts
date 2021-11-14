import Classes from '../../../types/classes';
import Orientation from '../../../types/orientation';
import { IEdge, IEdgeService, IPossibleValues } from '../../../types/interfaces';
import copyObject from '../../../helpers/copyObject';
import Edge from '../Edge/Edge';

class EdgeService {
  
  private edgeServiceState: IEdgeService;

  private edgeElements: Edge[];

  private edgeStates: IEdge[];

  private valueClassList: string[];

  private edgeClassList: string[];

  constructor(edgeServiceState: IEdgeService) {
    this.edgeServiceState = copyObject(edgeServiceState)
    this.valueClassList = this.setValueClassLists()
    this.edgeClassList = this.setEdgeClassLists()
    this.edgeStates = this.setStates()
    this.edgeElements = this.setEdges()
  } 

  get getState(): IEdgeService {
    return this.edgeServiceState
  }
  get getElements(): Edge[] {
    return this.edgeElements
  }
  get getStates(): IEdge[] {
    return this.edgeStates
  }
  get getValueClass(): string[] {
    return this.valueClassList
  }
  get getEdgeClass(): string[] {
    return this.edgeClassList
  }
  
  public update(edgeServiceState: IEdgeService): void {
    this.edgeServiceState = copyObject(edgeServiceState)
    this.edgeClassList = this.setEdgeClassLists()
    this.valueClassList = this.setValueClassLists()
    this.edgeStates = this.setStates()
    this.updateEdgeElements()
  }

  public getTemplate(): HTMLElement[] {
    return this.edgeElements.map((edge: Edge) => {
      return edge.getTemplate()
    })
  }

  private updateEdgeElements(): void {
    if(this.edgeStates.length !== this.edgeElements.length) {
      this.edgeElements = this.setEdges()
      return 
    }
    this.edgeStates.forEach((state, idx) => {
      this.edgeElements[idx].update(state)
    })
  }

  private setStates(): IEdge[] {
    const {possibleValues, orientation} = this.edgeServiceState
    const states: IEdge[] = []
    Object.keys(possibleValues as IPossibleValues).forEach((key) => {
      const edgeState: IEdge = {
        offset: (possibleValues as IPossibleValues)[Number(key)],
        edge: Number(key),
        orientation: orientation,
        valueClassList: this.valueClassList,
        edgeClassList: this.edgeClassList
      }
      states.push(edgeState)
    })
    return states
  }

  private setValueClassLists(): string[] {
    this.valueClassList = []
    if(this.isHorizontal()) {
      return [Classes.sliderValue, Classes.sliderValueHorizontal]
    }
    return [Classes.sliderValue, Classes.sliderValueVertical]
  }

  private setEdgeClassLists(): string[] {
    this.edgeClassList = []
    if(this.isHorizontal()) {
      return [Classes.sliderEdge, Classes.sliderEdgeHorizontal]
    }
    return [Classes.sliderEdge, Classes.sliderEdgeVertical]
  }

  private setEdges(): Edge[] {
    return this.edgeStates.map((state) => {
      return new Edge(state)
    })
  }

  private isHorizontal(): boolean {
    return this.edgeServiceState.orientation === Orientation.HORIZONTAL
  }
}

export default EdgeService;
