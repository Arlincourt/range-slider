/**
 * @jest-environment jsdom
*/

import Classes from '../../../types/classes';
import Point from './Point';

describe('Point module', () => {

  test('should return html element with class ', () => {
    const point = new Point();

    expect(point.getTemplate().classList.contains(Classes.sliderPoint)).toBe(true);
  });
})