import IOptions from './types/options-types'

declare global {
  interface JQuery {
    slider(options: IOptions): any;
  }
}