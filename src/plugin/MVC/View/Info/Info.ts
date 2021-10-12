import EdgeService from "../EdgeService/EdgeService"
import {IEdgeService, IInfo} from '../../../types/interfaces'
import Classes from "../../../types/classes"
import setType from "../../../helpers/setType"
import InterfacesNames from "../../../types/interfacesNames"
import Orientation from "../../../types/orientation"


class Info {
  private info: HTMLElement = document.createElement('div')
  private infoState: IInfo
  private edgeService: EdgeService
  private edgeServiceData: IEdgeService

  constructor(infoState: IInfo) {
    this.infoState = infoState
    this.edgeServiceData = setType(InterfacesNames.IRunnerService, this.infoState)
    this.edgeService = new EdgeService(this.edgeServiceData)
    this.addClass()
    this.addElems()
  }

  public update(infoState: IInfo): void {
    if(this.infoState.orientation !== infoState.orientation) {
      this.addClass()
    }
    this.infoState = infoState
    this.edgeServiceData = setType(InterfacesNames.IRunnerService, this.infoState)
    this.edgeService.update(this.edgeServiceData)
  }

  private addClass(): void {
    this.info.className = ''
    this.info.classList.add(Classes.sliderInfo)
    if(this.infoState.orientation === Orientation.VERTICAL) {
      this.info.classList.add(Classes.sliderInfoVertical)
    } else {
      this.info.classList.add(Classes.sliderInfoHorizontal)
    }
  }

  private addElems(): void {
    this.edgeService.getTemplate().forEach((edge) => {
      this.info.append(edge)
    })
  }
}

export default Info 