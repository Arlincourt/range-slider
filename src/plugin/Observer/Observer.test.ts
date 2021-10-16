import Observer from './Observer';
import Orientation from '../types/orientation'

describe('Observer module', () => {
  let observer: Observer;

  beforeEach(() => { 
    observer = new Observer(); 
  });

  test('Observer must be called with certain parameters twice for each subscribes', () => {
    const options1 = {
      clientHeight: 300,
      clientWidth: 952,
      clientX: 19,
      clientY: 35,
    }

    const options2 = {
      clientHeight: 400,
      clientWidth: 1052,
      clientX: 619,
      clientY: 135,
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