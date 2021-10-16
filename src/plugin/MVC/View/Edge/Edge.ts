import { IEdge } from '../../../types/interfaces';
import isArraysEqual from '../../../helpers/isArraysEqual';

class Edge {
  private edge: HTMLElement = document.createElement('div')

  private edgeState: IEdge;

  constructor(state: IEdge) {
    this.edgeState = state;
    this.addClass(this.edgeState.classList);
    this.setEdge(this.edgeState.edge);
  }

  public getTemplate(): HTMLElement {
    return this.edge;
  }

  public update(newState: IEdge): void {
    if (!isArraysEqual(this.edgeState.classList, newState.classList)) {
      this.addClass(newState.classList);
    }
    this.edgeState = newState;
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
