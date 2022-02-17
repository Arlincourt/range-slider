import Classes from '../../../types/classes';
import InterfacesNames from '../../../types/interfacesNames';
import { IEdgeService, IScale } from '../../../types/interfaces';
import setType from '../../../helpers/setType';
import copyObject from '../../../helpers/copyObject';
import EdgeService from '../EdgeService/EdgeService';

class Scale {
  private scale: HTMLElement = document.createElement('div')

  private scaleState: IScale

  private edgeService: EdgeService

  private edgeServiceData: IEdgeService

  constructor(scaleState: IScale) {
    this.scaleState = copyObject(scaleState);
    this.edgeServiceData = setType(InterfacesNames.IEdgeService, this.scaleState);
    this.edgeService = new EdgeService(this.edgeServiceData, this.scale);
    this.addClass();
    this.addElems();
    this.addEvent();
    this.onWindowResize();
    this.onWindowResize();
  }

  public update(scaleState: IScale): void {
    this.scaleState = copyObject(scaleState);
    this.edgeServiceData = setType(InterfacesNames.IEdgeService, this.scaleState);
    this.edgeService.update(this.edgeServiceData);
    this.addElems();
  }

  private onWindowResize = (): void => {
    this.edgeService.updateEdgeElements();
    if (this.isChanged()) {
      this.addElems();
    }
  }

  private addEvent = (): void => window.addEventListener('resize', this.onWindowResize);

  public getTemplate = (): HTMLElement => this.scale;

  private addClass = (): void => this.scale.classList.add(Classes.sliderScale);

  private addElems(): void {
    this.scale.innerHTML = '';
    this.edgeService.getTemplate().forEach((edge) => {
      this.scale.append(edge);
    });
  }

  private isChanged(): boolean {
    return this.scale.childElementCount !== this.edgeService.getTemplate().length;
  }
}

export default Scale;
