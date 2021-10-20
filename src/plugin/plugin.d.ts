import {IOptions, IState} from './types/interfaces';

declare global {
  interface JQuery {
    slider(options?: IOptions | string, value?: any): IOptions | IState | JQuery;
  }
}
