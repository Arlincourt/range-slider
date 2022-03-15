import isArraysEqual from './isArraysEqual';

describe('isArraysEqual module', () => {
  test('isArraysEqual should return true', () => {
    const arr1: number[] = [0, 1, 2];
    const arr2: number[] = [0, 1, 2];

    const result = isArraysEqual(arr1, arr2);

    expect(result).toBe(true);
  });

  test('isArraysEqual should return false', () => {
    const arr1: number[] = [0, 1, 2];
    const arr2: number[] = [0, 1, 3];

    const result = isArraysEqual(arr1, arr2);

    expect(result).toBe(false);
  });
})