import copyObject from '../../../helpers/copyObject';
import isArraysEqual from '../../../helpers/isArraysEqual';
import Orientation from '../../../types/orientation';
import { IEdge } from '../../../types/interfaces';

class Edge {
  private edge: HTMLElement = document.createElement('div')

  private edgeText: HTMLElement = document.createElement('div')

  private edgeState: IEdge;

  constructor(edgeState: IEdge) {
    this.edgeState = copyObject(edgeState);
    this.addEdgeClass(this.edgeState.edgeClassList);
    this.addValueClass(this.edgeState.valueClassList);
    this.setText();
    this.addElem();
    this.setStyle();
  }

  public getTemplate = (): HTMLElement => this.edge;

  public update(edgeState: IEdge): void {
    if (!isArraysEqual(this.edgeState.edgeClassList, edgeState.edgeClassList)) {
      this.addEdgeClass(edgeState.edgeClassList);
    }
    if (!isArraysEqual(this.edgeState.valueClassList, edgeState.valueClassList)) {
      this.addValueClass(edgeState.valueClassList);
    }
    this.edgeState = copyObject(edgeState);
    this.setText();
    this.setStyle();
  }

  private setStyle(): void {
    const { orientation, offset } = this.edgeState;
    if (orientation === Orientation.HORIZONTAL) {
      this.edge.style.top = '0%';
      this.edge.style.left = `${offset}%`;
      return;
    }
    this.edge.style.left = '0%';
    this.edge.style.top = `${offset}%`;
  }

  private addEdgeClass(classNames: string[]): void {
    this.edge.className = '';
    classNames.forEach((className) => {
      this.edge.classList.add(className);
    });
  }

  private addValueClass(classNames: string[]): void {
    this.edgeText.className = '';
    classNames.forEach((className) => {
      this.edgeText.classList.add(className);
    });
  }

  private setText(): void {
    this.edgeText.textContent = String(this.edgeState.edge);
  }

  private addElem = (): void => this.edge.append(this.edgeText);
}

export default Edge;
