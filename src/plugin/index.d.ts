import { IOptions, IState, IArgs } from './types/interfaces';

declare global {
  interface JQuery {
    slider(options?: IOptions | string, value?: IArgs): IOptions | IState | JQuery;
  }
}
