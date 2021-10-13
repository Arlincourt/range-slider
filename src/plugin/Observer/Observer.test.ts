import Observer from './Observer';
import Orientation from '../types/orientation'

describe('Observer module', () => {
  let observer: Observer;

  beforeEach(() => { 
    observer = new Observer(); 
  });

  test('Observer must be called with certain parameters twice for each subscribes', () => {
    const options1 = {
      min: 0,
      max: 100,
      tips: true,
      step: 1,
      range: true,
      orientation: Orientation.VERTICAL,
      value: [0, 15]
    }

    const options2 = {
      min: 20,
      max: 120,
      tips: false,
      step: 2,
      range: false,
      orientation: Orientation.HORIZONTAL,
      value: [20, 45]
    }

    const mockFn1: any = jest.fn(options => options.min)
    const mockFn2: any = jest.fn(options => options.min)
    

    observer.subscribe('viewChange', mockFn1)
    observer.subscribe('viewChange', mockFn2)
    observer.emit('viewChange', options1)
    observer.emit('viewChange', options2)
    

    expect(mockFn1.mock.calls[0][0]).toEqual(options1)
    expect(mockFn1.mock.calls[1][0]).toEqual(options2)
    expect(mockFn1.mock.calls.length).toBe(2)

    expect(mockFn2.mock.calls[0][0]).toEqual(options1)
    expect(mockFn2.mock.calls[1][0]).toEqual(options2)
    expect(mockFn2.mock.calls.length).toBe(2)
  })
})