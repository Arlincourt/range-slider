import Classes from '../../../types/classes';
import Orientation from '../../../types/orientation';
import { IEdge, IEdgeService, IPossibleValues } from '../../../types/interfaces';
import Edge from '../Edge/Edge';

interface IAllEdges {
  [key: number]: Edge[];
}

class EdgeService {
  private _edgeServiceState: IEdgeService;

  private _edgeElements: Edge[] = [];

  private _edgeStates: IEdge[] = [];

  private _prevEdgeStates: IEdge[] = [];

  private _allEdges: IAllEdges = {};

  private _valueClassList: string[];

  private _edgeClassList: string[];

  private readonly _scale: HTMLElement;

  private _prevCoor: number;

  constructor(edgeServiceState: IEdgeService, scale: HTMLElement) {
    this._scale = scale;
    this._prevCoor = scale.getBoundingClientRect().width;
    this._edgeServiceState = { ...edgeServiceState };
    this._valueClassList = this._setValueClassLists();
    this._edgeClassList = this._setEdgeClassLists();
    this._edgeStates = this._setStates();
    this._updatePrevStates();
    this._edgeElements = this._setEdges();
  }

  public update(edgeServiceState: IEdgeService): void {
    this._edgeServiceState = { ...edgeServiceState };
    this._edgeClassList = this._setEdgeClassLists();
    this._valueClassList = this._setValueClassLists();
    this._updatePrevStates();
    this._edgeStates = this._setStates();
    this.updateEdgeElements();
  }

  public getTemplate = (): HTMLElement[] => this._edgeElements
    .map((edge: Edge) => edge.getTemplate());

  public updateEdgeElements(): void {
    const { width } = this._scale.getBoundingClientRect();
    this._updateEdges();
    this.checkToOverlap();

    if (width > this._prevCoor) {
      this._checkEdges();
    }
    this._prevCoor = width;
  }

  public checkToOverlap(): void {
    if (this._isOverlap()) {
      this._edgeElements = this._cutEdges();
    }
  }

  get getState(): IEdgeService {
    return this._edgeServiceState;
  }

  get getElements(): Edge[] {
    return this._edgeElements;
  }

  get getStates(): IEdge[] {
    return this._edgeStates;
  }

  get getValueClass(): string[] {
    return this._valueClassList;
  }

  get getEdgeClass(): string[] {
    return this._edgeClassList;
  }

  private _updateEdges(): void {
    if (JSON.stringify(this._prevEdgeStates) !== JSON.stringify(this._edgeStates)) {
      this._updatePrevStates();
      this._edgeElements = this._setEdges();
      this._allEdges = {};
    }
  }

  private _isOverlap(): boolean {
    let isOverlap = false;
    this._edgeElements.forEach((edge: Edge, idx: number) => {
      if (this._edgeElements[idx + 1] === undefined) {
        return false;
      }
      const currentCoor = edge.getTemplate().getBoundingClientRect();
      const nextCoor = this._edgeElements[idx + 1].getTemplate().getBoundingClientRect();
      const isXOverlap = (currentCoor.x + currentCoor.width + 5) >= nextCoor.x;
      const isYOverlap = (currentCoor.y + currentCoor.height + 5) >= nextCoor.y;
      if (currentCoor.width === 0) {
        return false;
      }
      if (this._edgeServiceState.orientation === Orientation.HORIZONTAL) {
        isOverlap = isXOverlap ? true : isOverlap;
      } else {
        isOverlap = isYOverlap ? true : isOverlap;
      }
      return false;
    });
    return isOverlap;
  }

  private _checkEdges(): void {
    const { width } = this._scale.getBoundingClientRect();
    let isFind = false;
    Object.keys(this._allEdges)
      .sort((a: string, b: string) => Number(a) + Number(b))
      .forEach((key: string) => {
        if (isFind) {
          return;
        }
        if (width > Number(key)) {
          this._edgeElements = this._allEdges[Number(key)];
          isFind = true;
        }
      });
  }

  private _updatePrevStates(): void {
    this._prevEdgeStates = { ...this._edgeStates };
  }

  private _setStates(): IEdge[] {
    const { possibleValues, orientation } = this._edgeServiceState;
    const states: IEdge[] = [];
    Object.keys(possibleValues as IPossibleValues).forEach((key) => {
      const edgeState: IEdge = {
        offset: (possibleValues as IPossibleValues)[Number(key)],
        edge: Number(key),
        orientation,
        valueClassList: this._valueClassList,
        edgeClassList: this._edgeClassList,
      };
      states.push(edgeState);
    });
    states.sort((a: IEdge, b: IEdge): number => a.edge - b.edge);
    return states;
  }

  private _setEdges = (): Edge[] => this._edgeStates.map((state) => new Edge(state));

  private _setValueClassLists(): string[] {
    this._valueClassList = [];
    if (this._isHorizontal()) {
      return [Classes.sliderValue, Classes.sliderValueHorizontal];
    }
    return [Classes.sliderValue, Classes.sliderValueVertical];
  }

  private _setEdgeClassLists(): string[] {
    this._edgeClassList = [];
    if (this._isHorizontal()) {
      return [Classes.sliderEdge, Classes.sliderEdgeHorizontal];
    }
    return [Classes.sliderEdge, Classes.sliderEdgeVertical];
  }

  private _cutEdges(): Edge[] {
    const result: Edge[] = [];
    this._edgeElements.forEach((edge: Edge, idx: number) => {
      const isEven = idx % 2 === 1;
      const isDifferent = idx !== this._edgeElements.length - 1;
      if (isEven && isDifferent) {
        return;
      }
      result.push(edge);
    });
    let width = 0;
    this._edgeElements.forEach((edge: Edge) => {
      width += edge.getTemplate().getBoundingClientRect().width;
    });

    const isUndefined = this._allEdges[width] === undefined;
    const isMoreThanTwo = result.length > 2;

    if (isUndefined && isMoreThanTwo) {
      this._allEdges[width] = [...this._edgeElements];
    }
    return result;
  }

  private _isHorizontal(): boolean {
    return this._edgeServiceState.orientation === Orientation.HORIZONTAL;
  }
}

export default EdgeService;
