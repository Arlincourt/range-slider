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
    this.addEvent();
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

  private onWindowResize = (): void => {
    this.isOverlap()
  }

  private isOverlap(): boolean {
    let isOverlap = false
    this.edgeElements.forEach((edge: Edge, idx: number) => {
      if(this.edgeElements[idx + 1] === undefined) {
        return
      }
      const currentCoor = edge.getTemplate().getBoundingClientRect()
      const nextCoor = this.edgeElements[idx + 1].getTemplate().getBoundingClientRect()
      const isXOverlap = (currentCoor.x + currentCoor.width + 5) >= nextCoor.x
      const isYOverlap = (currentCoor.y + currentCoor.height + 5) >= nextCoor.y
      if(this.edgeServiceState.orientation === Orientation.HORIZONTAL) {
        isOverlap = isXOverlap ? true : isOverlap
        return 
      }
      isOverlap = isYOverlap ? true : isOverlap
    })
    
    return isOverlap
  }

  private addEvent(): void {
    window.addEventListener('resize', this.onWindowResize)
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
    let states: IEdge[] = []
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
    states.sort((a: IEdge, b: IEdge): number => {
      return a.edge - b.edge
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
