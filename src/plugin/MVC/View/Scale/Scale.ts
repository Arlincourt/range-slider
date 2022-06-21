import Classes from '../../../types/classes';
import InterfacesNames from '../../../types/interfacesNames';
import { IEdgeService, IScale } from '../../../types/interfaces';
import setType from '../../../helpers/setType';
import EdgeService from '../EdgeService/EdgeService';

class Scale {
  private _scale: HTMLElement = document.createElement('div');

  private _scaleState: IScale;

  private _edgeService: EdgeService;

  private _edgeServiceData: IEdgeService;

  constructor(scaleState: IScale) {
    this._scaleState = { ...scaleState };
    this._edgeServiceData = setType(InterfacesNames.IEdgeService, this._scaleState);
    this._edgeService = new EdgeService(this._edgeServiceData, this._scale);
    this._addClass();
    this._addElems();
    this._addEvent();
    this._handleWindowResize();
    this._handleWindowResize();
  }

  public update(scaleState: IScale): void {
    this._scaleState = { ...scaleState };
    this._edgeServiceData = setType(InterfacesNames.IEdgeService, this._scaleState);
    this._edgeService.update(this._edgeServiceData);
    this._addElems();
  }

  public getTemplate = (): HTMLElement => this._scale;

  private _handleWindowResize = (): void => {
    this._edgeService.updateEdgeElements();
    if (this._isChanged()) {
      this._addElems();
    }
  }

  private _addEvent = (): void => window.addEventListener('resize', this._handleWindowResize);

  private _addClass = (): void => this._scale.classList.add(Classes.sliderScale);

  private _addElems(): void {
    this._scale.innerHTML = '';
    this._edgeService.getTemplate().forEach((_edge) => {
      this._scale.append(_edge);
    });
  }

  private _isChanged(): boolean {
    return this._scale.childElementCount !== this._edgeService.getTemplate().length;
  }
}

export default Scale;
