/**
 * @jest-environment jsdom
*/

import Classes from "../../../types/classes";
import Tip from "./Tip";


describe('Tip module', () => {

  test('should return html element with class and with correct textContent', () => {
    const tip = new Tip(2);

    expect(tip.getTemplate().classList.contains(Classes.sliderTip)).toBe(true);
    expect(tip.getTemplate().textContent).toBe('2');

    tip.update(3);

    expect(tip.getTemplate().textContent).toBe('3');
  })
})