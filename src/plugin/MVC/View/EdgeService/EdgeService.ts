import Classes from '../../../types/classes';
import Orientation from '../../../types/orientation';
import { IEdge, IEdgeService, IPossibleValues } from '../../../types/interfaces';
import Edge from '../Edge/Edge';

interface IAllEdges {
  [key: number]: Edge[]
}

class EdgeService {
  private edgeServiceState: IEdgeService;

  private edgeElements: Edge[] = [];

  private edgeStates: IEdge[] = [];

  private prevEdgeStates: IEdge[] = [];

  private allEdges: IAllEdges = {};

  private valueClassList: string[];

  private edgeClassList: string[];

  private readonly scale: HTMLElement;

  private prevCoor: number;

  constructor(edgeServiceState: IEdgeService, scale: HTMLElement) {
    this.scale = scale;
    this.prevCoor = scale.getBoundingClientRect().width;
    this.edgeServiceState = { ...edgeServiceState };
    this.valueClassList = this.setValueClassLists();
    this.edgeClassList = this.setEdgeClassLists();
    this.edgeStates = this.setStates();
    this.updatePrevStates();
    this.edgeElements = this.setEdges();
  }

  public update(edgeServiceState: IEdgeService): void {
    this.edgeServiceState = { ...edgeServiceState };
    this.edgeClassList = this.setEdgeClassLists();
    this.valueClassList = this.setValueClassLists();
    this.updatePrevStates();
    this.edgeStates = this.setStates();
    this.updateEdgeElements();
  }

  public getTemplate = (): HTMLElement[] => this.edgeElements
    .map((edge: Edge) => edge.getTemplate());

  public updateEdgeElements(): void {
    const { width } = this.scale.getBoundingClientRect();
    this.updateEdges();
    this.checkToOverlap();

    if (width > this.prevCoor) {
      this.checkEdges();
    }
    this.prevCoor = width;
  }

  public checkToOverlap(): void {
    if (this.isOverlap()) {
      this.edgeElements = this.cutEdges();
    }
  }

  get getState(): IEdgeService {
    return this.edgeServiceState;
  }

  get getElements(): Edge[] {
    return this.edgeElements;
  }

  get getStates(): IEdge[] {
    return this.edgeStates;
  }

  get getValueClass(): string[] {
    return this.valueClassList;
  }

  get getEdgeClass(): string[] {
    return this.edgeClassList;
  }

  private updateEdges(): void {
    if (JSON.stringify(this.prevEdgeStates) !== JSON.stringify(this.edgeStates)) {
      this.updatePrevStates();
      this.edgeElements = this.setEdges();
      this.allEdges = {};
    }
  }

  private isOverlap(): boolean {
    let isOverlap = false;
    this.edgeElements.forEach((edge: Edge, idx: number) => {
      if (this.edgeElements[idx + 1] === undefined) {
        return false;
      }
      const currentCoor = edge.getTemplate().getBoundingClientRect();
      const nextCoor = this.edgeElements[idx + 1].getTemplate().getBoundingClientRect();
      const isXOverlap = (currentCoor.x + currentCoor.width + 5) >= nextCoor.x;
      const isYOverlap = (currentCoor.y + currentCoor.height + 5) >= nextCoor.y;
      if (currentCoor.width === 0) {
        return false;
      }
      if (this.edgeServiceState.orientation === Orientation.HORIZONTAL) {
        isOverlap = isXOverlap ? true : isOverlap;
      } else {
        isOverlap = isYOverlap ? true : isOverlap;
      }
      return false;
    });
    return isOverlap;
  }

  private checkEdges(): void {
    const { width } = this.scale.getBoundingClientRect();
    let isFind = false;
    Object.keys(this.allEdges)
      .sort((a: string, b: string) => Number(a) + Number(b))
      .forEach((key: string) => {
        if (isFind) {
          return;
        }
        if (width > Number(key)) {
          this.edgeElements = this.allEdges[Number(key)];
          isFind = true;
        }
      });
  }

  private updatePrevStates(): void {
    this.prevEdgeStates = { ...this.edgeStates };
  }

  private setStates(): IEdge[] {
    const { possibleValues, orientation } = this.edgeServiceState;
    const states: IEdge[] = [];
    Object.keys(possibleValues as IPossibleValues).forEach((key) => {
      const edgeState: IEdge = {
        offset: (possibleValues as IPossibleValues)[Number(key)],
        edge: Number(key),
        orientation,
        valueClassList: this.valueClassList,
        edgeClassList: this.edgeClassList,
      };
      states.push(edgeState);
    });
    states.sort((a: IEdge, b: IEdge): number => a.edge - b.edge);
    return states;
  }

  private setEdges = (): Edge[] => this.edgeStates.map((state) => new Edge(state));

  private setValueClassLists(): string[] {
    this.valueClassList = [];
    if (this.isHorizontal()) {
      return [Classes.sliderValue, Classes.sliderValueHorizontal];
    }
    return [Classes.sliderValue, Classes.sliderValueVertical];
  }

  private setEdgeClassLists(): string[] {
    this.edgeClassList = [];
    if (this.isHorizontal()) {
      return [Classes.sliderEdge, Classes.sliderEdgeHorizontal];
    }
    return [Classes.sliderEdge, Classes.sliderEdgeVertical];
  }

  private cutEdges(): Edge[] {
    const result: Edge[] = [];
    this.edgeElements.forEach((edge: Edge, idx: number) => {
      const isEven = idx % 2 === 1;
      const isDifferent = idx !== this.edgeElements.length - 1;
      if (isEven && isDifferent) {
        return;
      }
      result.push(edge);
    });
    let width = 0;
    this.edgeElements.forEach((edge: Edge) => {
      width += edge.getTemplate().getBoundingClientRect().width;
    });

    const isUndefined = this.allEdges[width] === undefined;
    const isMoreThanTwo = result.length > 2;

    if (isUndefined && isMoreThanTwo) {
      this.allEdges[width] = [...this.edgeElements];
    }
    return result;
  }

  private isHorizontal(): boolean {
    return this.edgeServiceState.orientation === Orientation.HORIZONTAL;
  }
}

export default EdgeService;
