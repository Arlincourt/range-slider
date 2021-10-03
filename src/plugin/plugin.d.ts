import IState from './types/IState';

declare global {
  interface JQuery {
    slider(options?: IState | string, value?: any): IState | JQuery;
  }
}
