import { IEdge } from '../../../types/interfaces';
import isArraysEqual from '../../../helpers/isArraysEqual';
import copyObject from '../../../helpers/copyObject';

class Edge {
  private edge: HTMLElement = document.createElement('div')

  private edgeState: IEdge;

  constructor(edgeState: IEdge) {
    this.edgeState = copyObject(edgeState);
    this.addClass(this.edgeState.classList);
    this.setEdge(this.edgeState.edge);
  }

  public getTemplate(): HTMLElement {
    return this.edge;
  }

  public update(edgeState: IEdge): void {
    if (!isArraysEqual(this.edgeState.classList, edgeState.classList)) {
      this.addClass(edgeState.classList);
    }
    this.edgeState = copyObject(edgeState);
    this.setEdge(this.edgeState.edge);
  }

  private addClass(classNames: string[]): void {
    this.edge.className = '';
    classNames.forEach((className) => {
      this.edge.classList.add(className);
    });
  }

  private setEdge(edge: number): void {
    this.edge.textContent = String(edge);
  }
}

export default Edge;
