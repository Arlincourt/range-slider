import IOptions from './types/IOptions'
import IState from './types/IState'

declare global {
  interface JQuery {
    slider(options?: IOptions | string, value?: any): IState | JQuery;
  }
}