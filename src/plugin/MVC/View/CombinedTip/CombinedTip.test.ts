/**
 * @jest-environment jsdom
*/

import Classes from "../../../types/classes"
import Orientation from "../../../types/orientation"
import CombinedTip from "./CombinedTip"


describe('Tip module', () => {
  const combinedTipState1 = {
    value: [1, 2], 
    orientation: Orientation.VERTICAL
  }

  const combinedTipState2 = {
    value: [2, 3], 
    orientation: Orientation.HORIZONTAL
  }

  test('should return html element with class and with correct textContent', () => {
    const tip = new CombinedTip(combinedTipState1)

    expect(tip.getTemplate().classList.contains(Classes.sliderCombinedTip)).toBe(true)
    expect(tip.getTemplate().classList.contains(Classes.sliderCombinedTipVertical)).toBe(true)
    tip.update(combinedTipState2)
    expect(tip.getTemplate().classList.contains(Classes.sliderCombinedTip)).toBe(true)
    expect(tip.getTemplate().classList.contains(Classes.sliderCombinedTipVertical)).toBe(false)
    expect(tip.getTemplate().classList.contains(Classes.sliderCombinedTipHorizontal)).toBe(true)
  })
})