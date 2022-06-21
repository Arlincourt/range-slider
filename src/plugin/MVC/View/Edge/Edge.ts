import isArraysEqual from '../../../helpers/isArraysEqual';
import Orientation from '../../../types/orientation';
import { IEdge } from '../../../types/interfaces';

class Edge {
  private _edge: HTMLElement = document.createElement('div');

  private _edgeText: HTMLElement = document.createElement('div');

  private _edgeState: IEdge;

  constructor(edgeState: IEdge) {
    this._edgeState = { ...edgeState };
    this._addEdgeClass(this._edgeState.edgeClassList);
    this._addValueClass(this._edgeState.valueClassList);
    this._setText();
    this._addElem();
    this._setStyle();
  }

  public getTemplate = (): HTMLElement => this._edge;

  public update(edgeState: IEdge): void {
    if (!isArraysEqual(this._edgeState.edgeClassList, edgeState.edgeClassList)) {
      this._addEdgeClass(edgeState.edgeClassList);
    }
    if (!isArraysEqual(this._edgeState.valueClassList, edgeState.valueClassList)) {
      this._addValueClass(edgeState.valueClassList);
    }
    this._edgeState = { ...edgeState };
    this._setText();
    this._setStyle();
  }

  private _setStyle(): void {
    const { orientation, offset } = this._edgeState;
    if (orientation === Orientation.HORIZONTAL) {
      this._edge.style.top = '0%';
      this._edge.style.left = `${offset}%`;
      return;
    }
    this._edge.style.left = '0%';
    this._edge.style.top = `${offset}%`;
  }

  private _addEdgeClass(classNames: string[]): void {
    this._edge.className = '';
    classNames.forEach((className) => {
      this._edge.classList.add(className);
    });
  }

  private _addValueClass(classNames: string[]): void {
    this._edgeText.className = '';
    classNames.forEach((className) => {
      this._edgeText.classList.add(className);
    });
  }

  private _setText(): void {
    this._edgeText.textContent = String(this._edgeState.edge);
  }

  private _addElem = (): void => this._edge.append(this._edgeText);
}

export default Edge;
