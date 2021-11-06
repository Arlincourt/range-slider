import Classes from '../../../types/classes';
import InterfacesNames from '../../../types/interfacesNames';
import Orientation from '../../../types/orientation';
import { IEdgeService, IScale } from '../../../types/interfaces';
import setType from '../../../helpers/setType';
import copyObject from '../../../helpers/copyObject';
import EdgeService from '../EdgeService/EdgeService';

class Scale {
  private scale: HTMLElement = document.createElement('div')

  private scaleState: IScale

  private edgeService: EdgeService

  private edgeServiceData: IEdgeService

  constructor(infoState: IScale) {
    this.scaleState = copyObject(infoState);
    this.edgeServiceData = setType(InterfacesNames.IEdgeService, this.scaleState);
    this.edgeService = new EdgeService(this.edgeServiceData);
    this.addClass();
    this.addElems();
  }

  public update(infoState: IScale): void {
    if (this.scaleState.orientation !== infoState.orientation) {
      this.addClass(infoState.orientation);
    }
    this.scaleState = copyObject(infoState);
    this.edgeServiceData = setType(InterfacesNames.IEdgeService, this.scaleState);
    this.edgeService.update(this.edgeServiceData);
  }

  public getTemplate(): HTMLElement {
    return this.scale;
  }

  private addClass(orientation?: Orientation): void {
    this.scale.className = '';
    this.scale.classList.add(Classes.sliderScale);
    if (orientation) {
      if (orientation === Orientation.VERTICAL) {
        this.scale.classList.add(Classes.sliderScaleVertical);
        return;
      }

      this.scale.classList.add(Classes.sliderScaleHorizontal);
      return;
    }

    if (this.scaleState.orientation === Orientation.VERTICAL) {
      this.scale.classList.add(Classes.sliderScaleVertical);
      return;
    }
    this.scale.classList.add(Classes.sliderScaleHorizontal);
  }

  private addElems(): void {
    this.edgeService.getTemplate().forEach((edge) => {
      this.scale.append(edge);
    });
  }
}

export default Scale;
