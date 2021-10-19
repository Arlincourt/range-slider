import Orientation from "../plugin/types/orientation";

const slidersData = [
  { min: 0, max: 20, range: true, value: [8, 12], orientation: Orientation.HORIZONTAL, step: 2 },
  { min: 0, max: 110, range: true, value: [10, 25], orientation: Orientation.VERTICAL, step: 0.5 },
  { min: -200, max: 100, range: false, tips: false, value: [-100, 25], orientation: Orientation.HORIZONTAL },
  { min: -200, max: 100, range: false, tips: false, value: [-100, 25], orientation: Orientation.VERTICAL },
]

const sliders: any = [

]

$(() => {
  $('.wrapper').each((idx, el) => {
    sliders.push($(el).slider(slidersData[idx]));
  })
});

let range = false
let tips = false
let orientation = false

$('.range').on('change', (evt) => {
  if(range) {
    range = false
  } else {
    range = true
  }
  sliders[0].slider('setRange', range)
})
$('.tips').on('change', (evt) => {
  if(tips) {
    tips = false
  } else {
    tips = true
  }
  sliders[0].slider('setTips', tips)
})

$('.first').on('change', (evt) => {
  const input = evt.target as HTMLInputElement
  sliders[0].slider('setFirstValue', input.value)
})
$('.second').on('change', (evt) => {
  const input = evt.target as HTMLInputElement
  sliders[0].slider('setSecondValue', input.value)
})
$('.step').on('change', (evt) => {
  const input = evt.target as HTMLInputElement
  sliders[0].slider('setStep', input.value)
})
$('.min').on('change', (evt) => {
  const input = evt.target as HTMLInputElement
  sliders[0].slider('setMin', input.value)
})
$('.max').on('change', (evt) => {
  const input = evt.target as HTMLInputElement
  sliders[0].slider('setMax', input.value)
})
$('.first').on('change', (evt) => {
  const input = evt.target as HTMLInputElement
  sliders[0].slider('setFirstValue', input.value)
})
$('.second').on('change', (evt) => {
  const input = evt.target as HTMLInputElement
  sliders[0].slider('setSecondValue', input.value)
})
$('.orientation').on('change', (evt) => {
  if(orientation) {
    orientation = false
  } else {
    orientation = true
  }
  sliders[0].slider('setOrientation', orientation)
})