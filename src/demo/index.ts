import Orientation from "../plugin/types/orientation";

const slidersData = [
  { min: -200, max: 100, range: true, value: [-100, 25], orientation: Orientation.HORIZONTAL, step: 3 },
  { min: 0, max: 110, range: true, value: [10, 25], orientation: Orientation.VERTICAL, step: 0.5 },
  { min: -200, max: 100, range: false, tips: false, value: [-100, 25], orientation: Orientation.HORIZONTAL },
  { min: -200, max: 100, range: false, tips: false, value: [-100, 25], orientation: Orientation.VERTICAL },
]

$(() => {
  $('.wrapper').each((idx, el) => {
    $(el).slider(slidersData[idx]);
  })
});